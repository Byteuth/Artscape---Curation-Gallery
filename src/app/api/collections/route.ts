import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
	try {
		const collections = await prisma.collection.findMany();
		return NextResponse.json(collections);
	} catch (error) {
		console.error("Error fetching collections:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
