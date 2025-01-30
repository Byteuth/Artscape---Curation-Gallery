import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { collectionId: string } }
) {
	try {
		const { collectionId } = params;
		const { artwork } = await req.json();

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
			new Set([...existingImages, ...newImages.reverse()])
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
				data: {
					images: updatedArtworksUrl,
				},
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
	} catch (error: any) {
		console.error("Error updating collection:", error);

		return NextResponse.json(
			{ error: error.message || "Failed to update collection" },
			{ status: 500 }
		);
	}
}

export async function GET(
	request: NextRequest,
	{ params }: { params: { collectionId: string } }
): Promise<NextResponse> {
	try {
		const { collectionId } = params;

		const collection = await prisma.collection.findUnique({
			where: { id: collectionId },
			include: {
				artworks: true,
			},
		});

		if (!collection) {
			return NextResponse.json(
				{ error: "Collection not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(collection, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching collection:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to fetch collection" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { collectionId: string } }
) {
	try {
		const { collectionId } = params;

		const deletedCollection = await prisma.collection.delete({
			where: { id: collectionId },
		});

		return NextResponse.json(deletedCollection, { status: 200 });
	} catch (error: any) {
		console.error("Error deleting collection:", error);

		return NextResponse.json(
			{ error: error.message || "Failed to delete collection" },
			{ status: 500 }
		);
	}
}
