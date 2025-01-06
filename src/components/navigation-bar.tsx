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
import Link from "next/link";

export default function NavigationBar() {
	return (
		<nav className="bg-[#B6B8A2] flex items-center justify-between p-2 w-full shadow-lg">
			<Sheet>
				<div className="flex items-center space-x-4 ">
					<Link href="/">
						<h1 className="hidden lg-custom:block text-xl font-bold mr-6 text-center">
							Through the Canvas
						</h1>
					</Link>
					<div className="hidden md:flex space-x-4">
						<Link href="/gallery">
							<Button variant="ghost">Gallery</Button>
						</Link>
						<Button variant="ghost">Curated Collections</Button>
					</div>
				</div>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="h-5 w-5" />
					</Button>
				</SheetTrigger>
				<SheetContent
					side="left"
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
				<div className="relative hidden sm:flex items-center space-x-2">
					<Input
						className="pl-10 bg-white border-2 border-gray-200 focus:border-primary transition-colors"
						placeholder="Search artworks..."
					/>
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
				</div>

				<div className="hidden sm:flex space-x-2">
					<Button variant="outline">Log In</Button>
					<Button>Create Account</Button>
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
				<Button
					className="w-full justify-start hover:bg-primary/10 transition-colors  bg-[#ffffff]  text-black"
					variant="outline"
				>
					<Palette className="mr-2 h-5 w-5" />
					Artworks
				</Button>
				<Button
					className="w-full justify-start hover:bg-primary/10 transition-colors  bg-[#ffffff] text-black"
					variant="outline"
				>
					<Collection className="mr-2 h-5 w-5" />
					Curated Collections
				</Button>
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
