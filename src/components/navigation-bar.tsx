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
		<nav className="bg-[#B6B8A2] border-b-2 border-black flex items-center justify-between p-2 w-full ">
			<Sheet>
				<div className="flex items-center space-x-4 ">
					<Link href="/">
						<img
							src="/svg/ttc-logo.svg"
							alt="Logo"
							className=" mx-4 -translate-x-4 h-8 w-8"
						/>
					</Link>
					<div className="hidden md:flex space-x-4">
						<Link href="/gallery">
							<Button variant="ghost">Gallery</Button>
						</Link>
						<Link href="/collections">
							<Button variant="ghost">Curated Collections</Button>
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

				<SheetContent
					side="right"
					className="bg-gradient-to-r from-[#ebefe0] to-[#B6B8A2] border-black"
				>
					<SheetHeader>
						<SheetTitle className="sr-only ">Mobile Menu</SheetTitle>
						<SheetDescription className="sr-only ">
							Menu Options
						</SheetDescription>
					</SheetHeader>
					<MobileMenu />
				</SheetContent>
			</Sheet>

			{/* Right Section */}
			<div className="flex items-center space-x-4 ml-auto">
			

				<div className="hidden sm:flex space-x-2">
					{status === "authenticated" ? (
						<>
							<Button variant="outline" >Saved Collections</Button>
							<Button onClick={handleLogout}>Log Out</Button>
						</>
					) : (
						<>
							<Button variant="outline" onClick={handleLoginRedirect}>
								Log In
							</Button>
							<Button onClick={handleCreateAccountRedirect}>Create Account</Button>
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
					variant="outline"
				>
					<Palette className="mr-2 h-5 w-5" />
					Home
				</Button>
				<Link href="/gallery">
					<Button
						className="w-full justify-start hover:bg-primary/10 transition-colors  bg-[#ffffff]  text-black"
						variant="outline"
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
