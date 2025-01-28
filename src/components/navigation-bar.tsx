"use client";
import {
	Search,
	Menu,
	Palette,
	ShoppingBasketIcon as Collection,
	LogIn,
	UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function NavigationBar() {
	const { data: session, status } = useSession();

	const handleLoginRedirect = () => {
		window.location.href = "/auth/login";
	};
	const handleCreateAccountRedirect = () => {
		window.location.href = "/auth/signup";
	};

	const handleLogout = () => {
		signOut({ callbackUrl: "/" });
	};

	return (
		<nav className=" flex items-center justify-between p-2 w-full bg-white">
			<Sheet>
				<div className="flex items-center ">
					<Link href="/">
						<Image
							src="/images/logo-small.png"
							alt="Logo"
							className="h-16 object-contain"
							width={150}
							height={150}
						/>
					</Link>
					<div className="hidden md:flex space-x-4 h-6 w-6">
						<Link href="/gallery">
							<p>Gallery</p>
						</Link>
						<Link href="/collections">
							<p>Collections</p>
						</Link>
					</div>
				</div>
				<div className="flex w-full">
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden flex items-center justify-center ml-auto scale-[200%]"
						>
							<Menu className="h-5 w-5" />
						</Button>
					</SheetTrigger>
				</div>
				<div className="hidden md:flex pr-6">
					<Link href="/">
						<p>About</p>
					</Link>
				</div>
			</Sheet>

			{/* Right Section */}
			<div className="flex items-center space-x-4 ml-auto">
				<div className="hidden sm:flex space-x-2">
					{status === "authenticated" ? (
						<>
							<Link href={"/saved"}>
								<Button className="bg-green-400 text-black hover:bg-green-500">
									Saved
								</Button>
							</Link>

							<Button onClick={handleLogout}>Log Out</Button>
						</>
					) : (
						<>
							<Button
								className="bg-green-400 text-black hover:bg-green-500"
								onClick={handleLoginRedirect}
							>
								Log In
							</Button>
							<Button
								className="bg-gray-200 text-black hover:bg-gray-300"
								onClick={handleCreateAccountRedirect}
							>
								Sign Up
							</Button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export function MobileMenu() {
	return (
		<div className="flex flex-col space-y-6 p-6  ">
			<h2 className="text-2xl font-bold text-center"> Through the Canvas</h2>
			{/* Search input section */}
			<div className="relative">
				<Input
					className="pl-10 bg-white border-2 border-gray-200 focus:border-primary transition-colors"
					placeholder="Search artworks..."
				/>
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
			</div>
			<p className="text-center">or</p>
			{/* Navigation Buttons */}
			<div className="flex flex-col space-y-2 mt-4">
				<Button
					className="w-full justify-start hover:bg-primary/10 transition-colors bg-[#ffffff]  text-black"
					variant="ghost"
				>
					<Palette className="mr-2 h-5 w-5" />
					Home
				</Button>
				<Link href="/gallery">
					<Button
						className="w-full justify-start hover:bg-primary/10 transition-colors  bg-[#ffffff]  text-black"
						variant="ghost"
					>
						<Palette className="mr-2 h-5 w-5" />
						Gallery
					</Button>
				</Link>
				<Link href="/collections">
					<Button
						className="w-full justify-start hover:bg-primary/10 transition-colors  bg-[#ffffff] text-black"
						variant="outline"
					>
						<Collection className="mr-2 h-5 w-5" />
						Curated Collections
					</Button>
				</Link>
			</div>

			{/* Log In and Create Account buttons */}
			<div className="flex flex-col space-y-2 mt-4 pt-24 ">
				<Button
					variant="outline"
					className="justify-center hover:bg-primary/10 transition-colors"
				>
					<LogIn className="mr-2 h-5 w-5" />
					Log In
				</Button>

				<Button className="justify-center hover:bg-primary/90 ">
					<UserPlus className="mr-2 h-5 w-5" />
					Create Account
				</Button>
			</div>
		</div>
	);
}
