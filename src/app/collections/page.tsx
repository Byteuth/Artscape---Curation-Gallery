"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import CollectionSection from "@/components/collection-section";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";



export default function Collections() {
	return (
		<div className="mx-auto overflow-x-hidden">
			<NavigationBar />
			<Link href="/">
				<Button variant="ghost" className="md:m-4 m-2">
					<ArrowLeft className=" h-4 w-4" />
					Home
				</Button>
			</Link>
			<div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] items-center bg-gradient-to-r from-white to-[#ebefe0] drop-shadow-lg text-center py-6 lg:p-12 ">
				<div>
					<h1 className="lg:text-8xl text-4xl font-bold mb-8 px-4 lg:text-left text-center text-black">
						Curated Collections
					</h1>
				</div>
				<p className="text-gray-600 text-left px-4">
					Our editorial team and collaborators curate collections from the
					archive to unearth and highlight connections between cultural objects
					across institutions.
				</p>
			</div>

			<CollectionSection />
			<Footer />
		</div>
	);
}
