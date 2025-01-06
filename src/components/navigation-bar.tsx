"use client";

import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetDescription, SheetTitle } from "@/components/ui/sheet";

export default function NavigationBar() {
	return (
		<nav className="bg-[#B6B8A2] flex items-center justify-between p-2 w-full">
			<div className="flex items-center space-x-4">
				<h1 className="hidden lg-custom:block text-xl font-bold mr-6 text-center">
					Through the Canvas
				</h1>
				<div className="hidden md:flex space-x-4">
					<Button variant="ghost">Artworks</Button>
					<Button variant="ghost">Curated Collections</Button>
				</div>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle>Menu</SheetTitle>
							<SheetDescription>
						
								Make changes to your profile here. Click save when you`&lsquo;`,re done.
							</SheetDescription>
						</SheetHeader>
						<MobileMenu />
					</SheetContent>
				</Sheet>
			</div>

			{/* Right Section */}
			<div className="flex items-center space-x-4 ml-auto">
				<div className="hidden sm:flex items-center space-x-2">
					<Search className="h-5 w-5 text-muted-foreground" />
					<Input
						className="bg-white w-12 sm:w-24 md:w-32 lg:w-64 xl:w-80"
						placeholder="Search"
					/>
				</div>
				<div className="hidden sm:flex space-x-2">
					<Button variant="outline">Log In</Button>
					<Button>Create Account</Button>
				</div>
			</div>
		</nav>
	);
}

function MobileMenu() {
	return (
		<div className="flex flex-col space-y-4 mt-4">
			<h2 className="text-lg font-semibold mb-2">Menu</h2>
			<Button variant="ghost" className="justify-start">
				Artworks
			</Button>
			<Button variant="ghost" className="justify-start">
				Curated Collections
			</Button>
			<div className="flex items-center space-x-2 mt-4">
				<Search className="h-5 w-5 text-muted-foreground" />
				<Input className="bg-white" placeholder="Search" />
			</div>
			<Button variant="outline" className="mt-4">
				Log In
			</Button>
			<Button>Create Account</Button>
		</div>
	);
}
