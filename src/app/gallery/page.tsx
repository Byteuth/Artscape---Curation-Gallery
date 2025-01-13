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
import { getArtworksPageChange } from "../actions/getArtworksPageChange";
import { applyFilters } from "../utils/applyFilters";
import { Artwork, SearchObject, ArtworksResponse } from "@/types/index";

export default function Gallery() {
	const [visibleArtworksAmount, setVisibleArtworksAmount] =
		useState<number>(100);

	const [allRecords, setAllRecords] = useState<Artwork[]>([]);
	const [artworksRecords, setArtworksRecords] = useState<Artwork[]>([]);
	const [artworksInfo, setArtworksInfo] = useState<
		ArtworksResponse["info"] | null
	>(null);
	const [searchObject, setSearchObject] = useState<SearchObject>({
		keywords: [],
		hasImage: false,
		searchKey: "",
	});
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const LOCAL_STORAGE_KEY = "gallery-search-state";

	useEffect(() => {
		const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (savedState) {
			const { searchObject: restoredSearchObject } = JSON.parse(savedState);
			setSearchObject(restoredSearchObject);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			LOCAL_STORAGE_KEY,
			JSON.stringify({ searchObject, filteredArtworks })
		);
	}, [searchObject, filteredArtworks]);


	useEffect(() => {
		async function fetchArtworks() {
			if (searchObject.searchKey.trim() === "") return;
			setLoading(true);
			try {
				const data = await getArtworksByKeyword(searchObject.searchKey);
				setArtworksRecords(data.records);
				setArtworksInfo(data.info);
			} catch (error) {
				console.error("Failed to fetch artworks:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchArtworks();
	}, [searchObject]);

	useEffect(() => {
		const filtered = applyFilters(artworksRecords, searchObject);
		// console.log(searchObject)
		setFilteredArtworks(filtered);
	}, [searchObject, artworksRecords, artworksInfo]);

	useEffect(() => {
		// console.log(artworksInfo, artworksRecords);
	}, [artworksInfo, artworksRecords]);

	const handlePageChange = async (page: number, url: string | undefined) => {
		if (!url) console.log("error no url");
		setCurrentPage(page +1);
		const response = await getArtworksPageChange(page, url as string);
		setArtworksRecords(response.records);
		setArtworksInfo(response.info);
		console.log(response)
	};

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
							length={filteredArtworks.length}
							filteredArtworks={filteredArtworks}
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
						) : !loading &&
						  filteredArtworks.length === 0 &&
						  searchObject.searchKey !== "" ? (
							<div className="text-center py-8">
								<p className="text-lg text-gray-600">
									No artworks found for &quot;{searchObject.searchKey}&quot;
								</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
								{[0, 1, 2, 3].map((gridIndex) => (
									<div key={gridIndex} className="grid grid-cols-1 gap-6">
										{filteredArtworks
											.slice(0, visibleArtworksAmount)
											.filter((_, index) => index % 4 === gridIndex)
											.map((artwork, index) => {
												const artworkId =
													artwork.id ??
													`placeholder-${index}-${Math.floor(
														Math.random() * 10000
													)}`;
												const artworkImage =
													artwork.primaryimageurl ??
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
