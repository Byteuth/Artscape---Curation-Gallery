"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import Link from "next/link";

import NavigationBar from "@/components/navigation-bar";
import GalleryCarousel from "@/components/gallery-carousel";
import SearchAndFilter from "@/components/search-and-filter";
import Footer from "@/components/footer";

import { getArtworksByKeyword } from "../actions/getArtworksByKeyword";
import { Artwork, SearchObject } from "@/types/index";

export default function Gallery() {
	const [visibleArtworksAmount, setVisibleArtworksAmount] =
		useState<number>(100);
	const [artworks, setArtworks] = useState<any[]>([]);
	const [totalArtworks, setTotalArtworks] = useState<number>(0)
	const [searchObject, setSearchObject] = useState<SearchObject>({
		keywords: [],
		hasImage: false,
		searchKey: "",
	});
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function fetchArtworks() {
			if (!searchObject.searchKey.trim()) return;
			setLoading(true);
			try {
				const { harvardResponse, metResponse } = await getArtworksByKeyword(
					searchObject.searchKey
				);

			
				const combinedArtworks = [
					...harvardResponse.data.map((item) => ({
						id: item.id,
						title: item.title,
						dated: item.dated,
						primaryImage: item.primaryimageurl,
						source: "Harvard",
					})),
					...metResponse.data.map((item) => ({
						id: item.objectID,
						title: item.title,
						dated: item.objectDate,
						primaryImage: item.primaryImage,
						source: "Met",
					})),
				];
				setArtworks(combinedArtworks);
				setTotalArtworks(harvardResponse.total + metResponse.total);
			} catch (error) {
				console.error("Failed to fetch artworks:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchArtworks();
	}, [searchObject.searchKey]);

	useEffect(() => {
		console.log(artworks);
	}, [artworks]);

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
					<h1 className="lg:text-8xl text-4xl  font-bold mb-8 px-4 lg:text-left text-center text-black">
						Gallery
					</h1>
				</div>
				<p className="text-gray-600 text-left px-4">
					Search, enjoy and discover millions of public domain images of
					artworks and cultural artifacts from around the world and dating back
					to the beginnings of civilization.
				</p>
			</div>
			<GalleryCarousel />

			<div className="bg-[#ebefe0] ">
				<div className="max-w-screen-xl mx-auto ">
					<div className="px-6 py-12">
						<SearchAndFilter
							visibleArtworksAmount={visibleArtworksAmount}
							totalArtworks={totalArtworks}
							filteredArtworks={artworks}
							setSearchObject={setSearchObject}
						/>
						{/* Artworks card */}
						{loading ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
								{[...Array(12)].map((_, gridIndex) => (
									<div key={gridIndex} className="grid grid-cols-1 gap-6">
										<Card className="overflow-hidden">
											<CardContent className="p-0">
												<div className="relative w-full pt-[100%]">
													<Skeleton className="absolute inset-0" />
												</div>
												<div className="p-4">
													<Skeleton className="h-4 w-3/4 mb-2" />
													<Skeleton className="h-3 w-1/2" />
												</div>
											</CardContent>
										</Card>
									</div>
								))}
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
								{[0, 1, 2, 3].map((gridIndex) => (
									<div key={gridIndex} className="grid grid-cols-1 gap-6">
										{artworks
											.filter(
												(artwork) =>
													searchObject.hasImage ||
													(artwork.primaryImage &&
														artwork.primaryImage.trim() !== "")
											)
											.slice(0, visibleArtworksAmount)
											.filter((_, index) => index % 4 === gridIndex)
											.map((artwork, index) => {
												const artworkId =
													artwork.id ??
													`placeholder-${index}-${Math.floor(
														Math.random() * 10000
													)}`;
												const artworkImage =
													artwork.primaryImage ??
													"/images/placeholder-image.png";
												const artworkAlt = artwork.title ?? "Placeholder image";

												return (
													<Link
														key={artworkId}
														href={`/gallery/${encodeURIComponent(artworkId)}`}
													>
														<Card className="cursor-pointer overflow-hidden transform transition-transform hover:shadow-right-bottom md:hover:scale-105 z-10">
															<CardContent className="p-0">
																<div className="relative w-full">
																	<Image
																		src={artworkImage}
																		alt={artworkAlt}
																		width={500}
																		height={500}
																		style={{ objectFit: "contain" }}
																	/>
																</div>
																<div className="p-4">
																	<h3 className="font-semibold text-sm mb-1">
																		{artwork.title ?? "Untitled Artwork"}
																	</h3>
																	<p className="text-xs text-gray-600">
																		{artwork.dated ?? "Unknown Date"}
																	</p>
																</div>
															</CardContent>
														</Card>
													</Link>
												);
											})}
									</div>
								))}
							</div>
						)}

						{/* Pagination */}
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href="#"
										// onClick={() => handlePreviousPage()}
										className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
									/>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink
										href="#"
										className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
									>
										1
									</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationEllipsis className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground" />
								</PaginationItem>
								<PaginationItem>
									<PaginationNext
										href="#"
										onClick={() => handlePageChange(1, artworksInfo?.next)}
										className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
