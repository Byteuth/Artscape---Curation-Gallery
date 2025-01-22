"use client";
import { SessionProvider as AuthSessionProvider } from "next-auth/react";

export default function CustomSessionProvider({
	children,
	session,
}: {
	children: React.ReactNode;
	session?: any;
}) {
	return (
		<AuthSessionProvider session={session}>{children}</AuthSessionProvider>
	);
}
