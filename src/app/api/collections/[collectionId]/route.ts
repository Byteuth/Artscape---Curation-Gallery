import { NextRequest, NextResponse } from "next/server";
import { Artwork } from "@/types/index";
import prisma from "@/lib/db";

// PATCH: Update collection with new artwork
export async function PATCH(request: NextRequest, { params }: any) {
	try {
		const { collectionId } = await params;
		const { artwork }: { artwork: Artwork } = await request.json();

		if (!artwork || !artwork.id) {
			return NextResponse.json(
				{ error: "Invalid artwork data" },
				{ status: 400 }
			);
		}

		const existingCollection = await prisma.collection.findUnique({
			where: { id: collectionId },
			select: { images: true, artworks: { select: { objectId: true } } },
		});

		if (!existingCollection) {
			return NextResponse.json(
				{ error: "Collection not found" },
				{ status: 404 }
			);
		}

		const existingImages = existingCollection.images
			? existingCollection.images.split(",").filter(Boolean)
			: [];
		const newImages = artwork.images || [];
		const updatedImages = Array.from(
			new Set([...existingImages, ...newImages])
		);

		const updatedArtworksUrl = updatedImages.join(", ");
		const isArtworkAlreadyConnected = existingCollection.artworks.some(
			(existingArtwork) => existingArtwork.objectId === artwork.id
		);

		if (isArtworkAlreadyConnected) {
			return NextResponse.json(
				{ message: "Artwork is already in the collection" },
				{ status: 200 }
			);
		}

		const updatedCollection = await prisma.$transaction(async (prisma) => {
			const collection = await prisma.collection.update({
				where: { id: collectionId },
				data: { images: updatedArtworksUrl },
			});

			const upsertedArtwork = await prisma.artwork.upsert({
				where: { objectId: artwork.id },
				update: {
					title: artwork.title,
					images: updatedImages[updatedImages.length - 1],
					description: artwork.description,
					source: artwork.source,
					medium: artwork.medium,
					period: artwork.period,
					country: artwork.country,
					department: artwork.department,
					creditLine: artwork.creditLine,
					objectDate: artwork.objectDate,
					objectURL: artwork.objectURL,
				},
				create: {
					objectId: artwork.id,
					title: artwork.title,
					images: updatedImages[updatedImages.length - 1],
					description: artwork.description,
					source: artwork.source,
					medium: artwork.medium,
					period: artwork.period,
					country: artwork.country,
					department: artwork.department,
					creditLine: artwork.creditLine,
					objectDate: artwork.objectDate,
					objectURL: artwork.objectURL,
				},
			});

			await prisma.collection.update({
				where: { id: collectionId },
				data: {
					artworks: {
						connect: { id: upsertedArtwork.id },
					},
				},
			});

			return collection;
		});

		return NextResponse.json(updatedCollection, { status: 200 });
	} catch (error: unknown) {
		console.error("Error updating collection:", error);

		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Failed to update collection",
			},
			{ status: 500 }
		);
	}
}

// GET: Retrieve collection by ID
export async function GET(request: NextRequest, { params }: any) {
	try {
		const { collectionId } = await params;
		// const collectionId = "cm6kv17wj0001bdyss6mzk6sg";
		const collection = await prisma.collection.findUnique({
			where: { id: collectionId },
			include: { artworks: true },
		});

		return collection
			? NextResponse.json(collection, { status: 200 })
			: NextResponse.json({ error: "Collection not found" }, { status: 404 });
	} catch (error) {
		console.error("Error fetching collection:", error);
		return NextResponse.json(
			{ error: "Failed to fetch collection" },
			{ status: 500 }
		);
	}
}

// DELETE: Remove a collection
export async function DELETE(request: NextRequest, { params }: any) {
	try {
		const { collectionId } = await params;
		const deletedCollection = await prisma.collection.delete({
			where: { id: collectionId },
		});

		return NextResponse.json(deletedCollection, { status: 200 });
	} catch (error: unknown) {
		console.error("Error deleting collection:", error);

		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Failed to delete collection",
			},
			{ status: 500 }
		);
	}
}
