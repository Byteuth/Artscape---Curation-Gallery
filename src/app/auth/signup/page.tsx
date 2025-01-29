"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

export function Signupform({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email || !password || !name) {
			setError("Email and password are required");
			return;
		}

		try {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, name }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				if (errorData.error) {
					setError(errorData.error);
				} else {
					setError("An unexpected error occurred");
				}
			} else {
				setSuccess(true);
				const signInResponse = await signIn("credentials", {
					redirect: false,
					email,
					password,
				});

				if (signInResponse?.error) {
					setError("Login failed after account creation");
				} else {
					router.push("/");
				}
			}
		} catch (error) {
			console.error("Error during registration:", error);
			setError("An error occurred during registration.");
		} finally {
			setLoading(false);
		}
	};

	const handleRedirect = () => {
		router.push("/");
	};

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			{...props}
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Create your account</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Enter your name and email below to create an account
				</p>
			</div>
			<div className="grid gap-6">
				{!success ? (
					<>
						{" "}
						<div className="grid gap-2">
							<Label htmlFor="email">Name</Label>
							<Input
								id="name"
								type="name"
								placeholder="coolname"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
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
							</div>
							<Input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? (
								<Loader2 className="animate-spin mr-2 h-5 w-5" />
							) : (
								"Create account"
							)}
						</Button>
						{error && <div className="text-red-500">{error}</div>}
						<div className="text-center text-sm">
							Already have an account?{" "}
							<a href="/auth/login" className="underline underline-offset-4">
								Log in
							</a>
						</div>
					</>
				) : (
					<div className="flex flex-col items-center gap-4">
						<p className="text-green-500">Account created successfully!</p>
						<Button onClick={handleRedirect}>Home</Button>
					</div>
				)}
			</div>
		</form>
	);
}

export default function Signup() {
	return (
		<div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white via-green-100 to-green-200">
			<NavigationBar />
			<div className="flex flex-col gap-4 p-6 md:p-10 flex-grow justify-center items-center">
				<Card className="p-8 shadow-md">
					<div className="w-full max-w-xs">
						<Signupform />
					</div>
				</Card>
			</div>
			<Footer />
		</div>
	);
}
