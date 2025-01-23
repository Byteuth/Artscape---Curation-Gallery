"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import ArtworkDisplay from "@/components/artwork-display";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";
import { getArtworkByIdAndSource } from "../../actions/getArtworkByIdAndSource";
import { Artwork } from "@/types";

export default function ArtworkPage() {
	const router = useRouter();
	const pathname = usePathname();
	const [artwork, setArtwork] = useState<Artwork | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchArtwork = async () => {
			const segments = pathname.split("/");
			const source = segments[segments.length - 2];
			const id = segments.pop();

			if (!id || !source) {
				setLoading(false);
				return;
			}

			try {
				const result = await getArtworkByIdAndSource(id, source);
				setArtwork(result);
			} catch (error) {
				console.error("Failed to fetch artwork:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchArtwork();
	}, [pathname]);

	useEffect(() => {
		if (artwork) {
			
			document.title = `${artwork.title} | Curation Gallery`;
		}
	
	}, [artwork]);

	if (!artwork) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<Loader className="animate-spin text-[#B6B8A2]" size={64} />
				<p className="mt-8 px-6 py-3 rounded-md  text-gray font-semibold transition-colors">
					Loading
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto overflow-x-hidden">
			<NavigationBar />

			<Button
				variant="ghost"
				className="md:m-4 m-2"
				onClick={() => router.back()}
			>
				<ArrowLeft className="h-4 w-4" />
				Back to Gallery
			</Button>

			<div className="shadow-lg rotate-180">
				<div className="rotate-180">
					<ArtworkDisplay artwork={artwork} loading={loading} />
				</div>
			</div>
			<Footer />
		</div>
	);
}
