"use client";

import {ArrowLeft } from "lucide-react";
import NavigationBar from "@/components/navigation-bar";
import CollectionArtworks from "@/components/collection-artworks";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-medium-image-zoom/dist/styles.css";
import { Collections} from "@/types";



export default function CollectionId() {
	const pathname = usePathname();
	const router = useRouter();
	const [collection, setCollection] = useState<Collections | null>(null);
	const [loading, setLoading] = useState(true);

	const collectionId = pathname?.split("/").pop();

	useEffect(() => {
		if (collectionId) {
			fetch(`/api/collections/${collectionId}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Collection not found");
					}
					return response.json();
				})
				.then((data) => {
					setCollection(data);
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [collectionId]);

	return (
		<div className="mx-auto overflow-x-hidden">
			<NavigationBar />
			<Button
				variant="ghost"
				className="md:m-4 m-2"
				onClick={() => router.back()}
			>
				<ArrowLeft className="h-4 w-4" />
				Back to Collections
			</Button>

			{loading ? (
				<div className="text-center py-16">Loading...</div>
			) : (
				<CollectionArtworks
					artworks={collection?.artworks || []}
					collection={collection}
				/>
			)}

			{/* <Footer /> */}
		</div>
	);
}

