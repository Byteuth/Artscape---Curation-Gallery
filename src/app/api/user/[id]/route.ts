import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
	try {
		const userId = req.nextUrl.pathname.split("/").pop();

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}
		console.log(userId)
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				name: true,
			},
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		console.error("Error fetching user info:", error);
		return NextResponse.json(
			{ error: "Failed to fetch user info" },
			{ status: 500 }
		);
	}
}
