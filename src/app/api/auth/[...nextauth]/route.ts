import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "m@example.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				console.log("Authorizing user...");
				if (!credentials?.email || !credentials?.password) {
					console.log("Missing credentials");
					return null;
				}

				try {
					const user = await prisma.user.findUnique({
						where: { email: credentials.email },
					});

					console.log("User found:", user ? "Yes" : "No");

					if (!user) {
						console.log("User not found");
						return null;
					}

					console.log("Stored password hash:", user.password);
					console.log("Provided password:", credentials.password);

					const isPasswordValid = await bcrypt.compare(
						credentials.password,
						user.password
					);

					console.log("Password valid:", isPasswordValid);

					if (!isPasswordValid) {
						console.log("Invalid password");
						return null;
					}

					console.log("User authorized successfully");
					return { id: user.id, email: user.email, name: user.name };
				} catch (error) {
					console.error("Error during authorization:", error);
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
