import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const hashedPassword = await bcrypt.hash("password123", 10);

	await prisma.user.create({
		data: {
			email: "user@example.com",
			password: hashedPassword,
			name: "User Name",
			collections: {
				create: [
					{
						title: "First Collection",
						description: "This is a test collection",
					},
				],
			},
		},
	});

	console.log("User and collection created");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
