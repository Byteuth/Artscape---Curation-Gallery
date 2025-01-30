"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import { DialogDescription, DialogTitle } from "./ui/dialog";

export default function MobileNavbar() {
	const { data: session, status } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	const handleLoginRedirect = () => {
		window.location.href = "/auth/login";
	};

	const handleCreateAccountRedirect = () => {
		window.location.href = "/auth/signup";
	};

	const handleLogout = () => {
		signOut({ callbackUrl: "/" });
	};

	const closeSheet = () => {
		setIsOpen(false);
		console.log("Sheet closed");
	};

	const navItems = [
		{ href: "/gallery", label: "Gallery" },
		{ href: "/collections", label: "Collections" },
		{ href: "/", label: "About" },
	];

	return (
		<nav className="flex items-center justify-between p-4 bg-white">
			<Link href="/" className="flex items-center">
				<Image
					src="/images/logo-small.png"
					alt="Logo"
					className="h-12 w-auto object-contain"
					width={150}
					height={150}
				/>
			</Link>

			{/* Desktop Menu */}
			<div className="hidden md:flex items-center space-x-6">
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="text-gray-600 hover:text-gray-900"
					>
						{item.label}
					</Link>
				))}
				{status === "authenticated" ? (
					<>
						<Link href="/saved">
							<Button className="bg-green-400 text-black hover:bg-green-500">
								Saved
							</Button>
						</Link>
						<Button onClick={handleLogout} variant="outline">
							Log Out
						</Button>
					</>
				) : (
					<>
						<Button
							className="bg-gray-200 text-black border-2 border-green-400 hover:bg-green-300"
							onClick={handleLoginRedirect}
						>
							Log In
						</Button>
						<Button
							className="bg-green-400 text-black hover:bg-green-500"
							onClick={handleCreateAccountRedirect}
						>
							Sign Up
						</Button>
					</>
				)}
			</div>

			{/* Mobile Menu */}
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<DialogTitle className="sr-only ">Navigation Menu</DialogTitle>
				<DialogDescription className="sr-only">Navigation Menu </DialogDescription>

				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						aria-label="Open menu"
					>
						<Menu className="h-6 w-6" />
					</Button>
				</SheetTrigger>
				<SheetContent
					side="right"
					className="w-[300px] sm:w-[400px] flex flex-col"
				>
					<div className="flex justify-between items-center mb-6">
						<Link href="/" onClick={closeSheet}>
							<Image
								src="/images/logo-small.png"
								alt="Logo"
								className="h-12 w-auto object-contain"
								width={150}
								height={150}
							/>
						</Link>
					</div>
					<div className="flex flex-col space-y-4 flex-grow">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-lg font-medium"
								onClick={closeSheet}
							>
								{item.label}
							</Link>
						))}
					</div>
					<div className="mt-auto space-y-2 pb-4">
						{status === "authenticated" ? (
							<>
								<Link
									href="/saved"
									onClick={closeSheet}
									className="block w-full"
								>
									<Button className="w-full bg-green-400 text-black hover:bg-green-500">
										Saved
									</Button>
								</Link>
								<Button
									onClick={() => {
										handleLogout();
										closeSheet();
									}}
									variant="outline"
									className="w-full"
								>
									Log Out
								</Button>
							</>
						) : (
							<>
								<Button
									className="w-full bg-gray-200 text-black border-2 border-green-400 hover:bg-green-300"
									onClick={() => {
										handleLoginRedirect();
										closeSheet();
									}}
								>
									Log In
								</Button>
								<Button
									className="w-full bg-green-400 text-black hover:bg-green-500"
									onClick={() => {
										handleCreateAccountRedirect();
										closeSheet();
									}}
								>
									Sign Up
								</Button>
							</>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</nav>
	);
}
