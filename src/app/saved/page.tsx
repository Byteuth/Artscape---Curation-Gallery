"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import CollectionSection from "@/components/collection-section";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

export default function SavedCollections() {
	return (
		<div className="mx-auto overflow-x-hidden">
			<NavigationBar />
			<Link href="/">
				<Button variant="ghost" className="md:m-4 m-2">
					<ArrowLeft className=" h-4 w-4" />
					Home
				</Button>
			</Link>

			<div>
				<h1 className="lg:text-8xl text-4xl font-bold mb-8 px-4  text-center text-black pb-16">
					Saved Collections
				</h1>
			</div>

			<CollectionSection />
			{/* <Footer /> */}
		</div>
	);
}
