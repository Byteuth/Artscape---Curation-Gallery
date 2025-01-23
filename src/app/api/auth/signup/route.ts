import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
	try {
		const { email, password, name } = await req.json();

		if (!email || !password || !name) {
			return NextResponse.json(
				{ error: "Email and password are required." },
				{ status: 400 }
			);
		}

		// Check if the user already exists
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return NextResponse.json(
				{ error: "Email is already in use." },
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		return NextResponse.json({ message: "User registered successfully." });
	} catch (error) {
		console.error("Error registering user:", error);
		return NextResponse.json(
			{ error: "Internal server error." },
			{ status: 500 }
		);
	}
}
