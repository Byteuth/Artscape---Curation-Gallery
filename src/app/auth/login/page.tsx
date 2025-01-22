"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();



	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
	
		});

		if (result?.error) {
			if (result.error === "CredentialsSignin") {
				setError("Invalid email or password");
			}
		} else {
		
			router.back()
		}
	};

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			{...props}
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="m@example.com"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
						<a
							href="#"
							className="ml-auto text-sm underline-offset-4 hover:underline"
						>
							Forgot your password?
						</a>
					</div>
					<Input
						id="password"
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<Button type="submit" className="w-full">
					Login
				</Button>
				{error && <div className="text-red-500">{error}</div>}
				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
				<Button variant="outline" className="w-full">
					Login with GitHub
				</Button>
			</div>
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<a href="/auth/signup" className="underline underline-offset-4">
					Sign up
				</a>
			</div>
		</form>
	);
}

export default function Login() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center  bg-[#ebefe0]">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<Card className="p-8 shadow-md">
						<div className="w-full max-w-xs">
							<LoginForm />
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
