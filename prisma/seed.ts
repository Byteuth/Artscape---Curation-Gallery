import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const hashedPassword = await bcrypt.hash("password123", 10);

	await prisma.user.create({
		data: {
			email: "test@test.com",
			password: hashedPassword,
			name: "Test User",
		},
	});

	console.log("User created");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
