import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// Handle POST requests (Create a new collection)
export async function POST(req: NextRequest) {
	try {
		const { title, description, userId } = await req.json();

		// Validate input
		if (!title || !description) {
			return NextResponse.json(
				{ error: "Title and description are required" },
				{ status: 400 }
			);
		}

		if (!userId) {
			return NextResponse.json(
				{ error: "User not authenticated" },
				{ status: 401 }
			);
		}

		// Create a new collection
		const newCollection = await prisma.collection.create({
			data: {
				title,
				description,
				userId,
			},
		});

		return NextResponse.json(newCollection, { status: 201 });
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error creating collection:", error);
			return NextResponse.json(
				{ error: error.message || "Failed to create collection" },
				{ status: 500 }
			);
		} else {
			// Fallback if error is not an instance of Error
			console.error("Unexpected error:", error);
			return NextResponse.json(
				{ error: "An unexpected error occurred" },
				{ status: 500 }
			);
		}
	}
}

// Handle GET requests (Fetch all collections for the authenticated user)
export async function GET(req: NextRequest) {
	try {
		// const session = await getServerSession(authOptions);

		// if (!session || !session.user?.id) {
		// 	return NextResponse.json(
		// 		{ error: "User not authenticated" },
		// 		{ status: 401 }
		// 	);
		// }

		// const userId = session.user.id;
		const collections = await prisma.collection.findMany({
			include: {
				artworks: true,
			},
		});

		return NextResponse.json(collections, { status: 200 });
	} catch (error: unknown) {
		console.error("Error fetching collections:", error);
		return NextResponse.json(
			{ error: "Failed to fetch collections" },
			{ status: 500 }
		);
	}
}
