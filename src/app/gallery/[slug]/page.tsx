"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import ArtworkDisplay from "@/components/artwork-display";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";

export default function ArtworkPage() {
	const router = useRouter();
	return (
		<div className="mx-auto overflow-x-hidden">
			<NavigationBar />

			<Button
				variant="ghost"
				className="md:m-4 m-2"
				onClick={() => router.back()}
			>
				<ArrowLeft className=" h-4 w-4" />
				Back to Gallery
			</Button>

			<div className="shadow-lg rotate-180"> 
				<div className="rotate-180">

					<ArtworkDisplay />
				</div>
			</div>
			<Footer />
		</div>
	);
}
