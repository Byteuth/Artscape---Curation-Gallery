'use client'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import ArtworkDisplay from "@/components/artwork-display";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";

export default function ArtworkPage() {
	const router = useRouter();
	return (
		<>
			<NavigationBar />

			<Button
				variant="ghost"
				className="mt-12 ml-12 scale-[150%] mb-6"
				onClick={() => router.back()}
			>
				<ArrowLeft className=" h-4 w-4" />
				Back to Gallery
			</Button>

			<ArtworkDisplay />
			<Footer />
		</>
	);
}
