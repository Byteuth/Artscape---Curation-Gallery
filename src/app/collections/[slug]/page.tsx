"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Download, Maximize2, Share2, ArrowLeft } from "lucide-react";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Artwork {
	id: string;
	objectId: number;
	title: string;
	images: string;
	description: string | null;
	source: string;
	medium: string;
	period: string | null;
	country: string;
	department: string;
	creditLine: string;
	objectDate: string | null;
	objectURL: string;
	createdAt: string;
	updatedAt: string;
}

interface Collection {
	id: string;
	userId: string;
	title: string;
	images: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	artworks: Artwork[];
}

export default function CollectionId() {
	const pathname = usePathname();

	const [collection, setCollection] = useState<Collection | null>(null);
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
			<Link href="/">
				<Button variant="ghost" className="md:m-4 m-2">
					<ArrowLeft className="h-4 w-4" />
					Home
				</Button>
			</Link>

			{loading ? (
				<div className="text-center py-16">Loading...</div>
			) : (
				<CollectionArtworks
					artworks={collection?.artworks || []}
					collection={collection}
				/>
			)}

			<Footer />
		</div>
	);
}

interface CollectionArtworksProps {
	artworks: Artwork[];
	collection: Collection | null;
}

export function CollectionArtworks({
	artworks,
	collection,
}: CollectionArtworksProps) {
	return (
		<div className="bg-[#ebefe0]">
			<div className="w-full max-w-[1000px] mx-auto">
				<div className="p-8 mx-auto py-8">
					{/* Collection Header */}
					{collection && (
						<header className="mb-8">
							<h1 className="text-3xl font-bold mb-2">{collection.title}</h1>
							<p className="text-gray-700 text-sm">{collection.description}</p>
						</header>
					)}

					{/* Artworks List */}
					{artworks.map((artwork) => (
						<Card key={artwork.id} className="mb-8">
							<CardContent className="p-6">
								<h2 className="text-2xl font-bold mb-4">{artwork.title}</h2>
								<div className="flex flex-wrap pb-8 text-sm text-gray-600">
									<div className="w-full md:w-1/2 lg:w-1/4 pb-3">
										<span className="block font-bold">Source:</span>
										<span className="block">{artwork.source || "Unknown"}</span>
									</div>
									<div className="w-full md:w-1/2 lg:w-1/4 pb-3">
										<span className="block font-bold">Date:</span>
										<span className="block">
											{artwork.objectDate || "Unknown"}
										</span>
									</div>
									<div className="w-full md:w-1/2 lg:w-1/4 pb-3">
										<span className="block font-bold">Country:</span>
										<span className="block">
											{artwork.country || "Unknown"}
										</span>
									</div>
									<div className="w-full md:w-1/2 lg:w-1/4 pb-3">
										<span className="block font-bold">Department:</span>
										<span className="block">
											{artwork.department || "Unknown"}
										</span>
									</div>
								</div>

								{/* Main Image */}
								<section>
									<Card>
										<Image
											src={
												artwork.images?.includes(",")
													? artwork.images.split(",")[0].trim()
													: artwork.images || "/images/placeholder-image.png"
											}
											alt={artwork.title || "Artwork"}
											width={800}
											height={600}
											className="w-full max-auto max-h-[600px] object-contain rounded-xl"
										/>
									</Card>
								</section>

								<div className="flex justify-between items-center mt-4">
									<div className="flex ml-auto">
										<Button variant="outline" size="icon">
											<Download className="h-4 w-4" />
										</Button>
										<Button variant="outline" size="icon">
											<Maximize2 className="h-4 w-4" />
										</Button>
										<Button variant="outline" size="icon">
											<Share2 className="h-4 w-4" />
										</Button>
									</div>
								</div>

								{/* Artwork Details */}
								<section className="mt-8">
									<h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
										Artwork Details
									</h3>
									<Separator className="my-4" />

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										<div>
											<dt className="text-sm font-bold text-gray-500 mb-1">
												Medium
											</dt>
											<dd className="text-sm text-gray-900">
												{artwork.medium || "N/A"}
											</dd>
										</div>
										<div>
											<dt className="text-sm font-bold text-gray-500 mb-1">
												Period
											</dt>
											<dd className="text-sm text-gray-900">
												{artwork.period || "N/A"}
											</dd>
										</div>
										<div>
											<dt className="text-sm font-bold text-gray-500 mb-1">
												Credit Line
											</dt>
											<dd className="text-sm text-gray-900">
												{artwork.creditLine || "N/A"}
											</dd>
										</div>
										<div>
											<dt className="text-sm font-bold text-gray-500 mb-1">
												Object URL
											</dt>
											<dd className="text-sm text-gray-900">
												<a
													href={artwork.objectURL}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-600 hover:underline"
												>
													View on source website
												</a>
											</dd>
										</div>
									</div>

									{artwork.description && (
										<>
											<Separator className="my-4" />
											<div>
												<dt className="text-sm font-bold text-gray-500 mb-1">
													Description
												</dt>
												<dd className="text-sm text-gray-900">
													{artwork.description}
												</dd>
											</div>
										</>
									)}
								</section>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
