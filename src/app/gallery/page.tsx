"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useRouter } from "next/navigation";

import NavigationBar from "@/components/navigation-bar";
import GalleryCarousel from "@/components/gallery-carousel";
import SearchAndFilter from "@/components/search-and-filter";
import Footer from "@/components/footer";

import { getArtworksByKeyword } from "../actions/getArtworksByKeyword";
import {
	Artwork,
	HarvardArtwork,
	MetArtwork,
	SearchObject,
} from "@/types/index";

const PLACEHOLDER_IMAGE = "/images/placeholder-image.png";
const ITEMS_PER_PAGE = 20;
const PAGE_SIZE = ITEMS_PER_PAGE * 2;

export default function Gallery() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [artworks, setArtworks] = useState<Artwork[]>([]);
	const [totalArtworks, setTotalArtworks] = useState(0);
	const [searchObject, setSearchObject] = useState<SearchObject>({
		keywords: [],
		hasImage: false,
		searchKey: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [goToPage, setGoToPage] = useState("");
	const [initialized, setInitialized] = useState(false);

	// Ensure the searchObject state gets updated after checking localStorage
	useEffect(() => {
		const hasImagePreference = localStorage.getItem("hasImageFilter");
		if (hasImagePreference !== null) {
			setSearchObject((prev) => ({
				...prev,
				hasImage: JSON.parse(hasImagePreference),
			}));
		}
	}, []);

	// Sync query params with searchObject
	useEffect(() => {
		const queryParams = new URLSearchParams();
		if (searchObject.searchKey) {
			queryParams.append("search", searchObject.searchKey);
		}

		if (
			searchObject.searchKey !==
				new URLSearchParams(window.location.search).get("search") ||
			currentPage !== 1
		) {
			queryParams.append("page", currentPage.toString());
		}
	}, [searchObject.searchKey, currentPage, router]);

	// Reusable function to update URL and local storage
	const updateUrlAndLocalStorage = (newUrl: string) => {
		window.history.replaceState(null, "", newUrl);
		localStorage.setItem("lastVisitedGalleryUrl", newUrl);
	};

	// Sync query params with searchObject
	useEffect(() => {
		if (!initialized) return;

		const params = new URLSearchParams();
		if (currentPage > 1) params.set("page", currentPage.toString());
		if (searchObject.searchKey) params.set("search", searchObject.searchKey);

		const newUrl = `/gallery?${params.toString()}`;
		updateUrlAndLocalStorage(newUrl);
	}, [currentPage, searchObject.searchKey, initialized]);

	// Get page and search key from URL query
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const pageFromQuery = Number(urlParams.get("page")) || 1;
		const searchKeyFromQuery = urlParams.get("search") || "";

		setCurrentPage(pageFromQuery);
		setSearchObject((prev) => ({
			...prev,
			searchKey: searchKeyFromQuery,
		}));
		setInitialized(true);
	}, []);

	// Fetch artworks based on search criteria
	useEffect(() => {
		let isMounted = true;

		const fetchAndSetArtworks = async () => {
			// setLoading(true);
			try {
				const { harvardResponse, metResponse } = await getArtworksByKeyword(
					searchObject.searchKey,
					currentPage,
					ITEMS_PER_PAGE
				);

				if (isMounted) {
					const harvardArtworks = harvardResponse.data.map(
						(item: HarvardArtwork) => ({
							id: item.id,
							title: item.title,
							dated: item.dated,
							images: item.images?.map((image) => image.baseimageurl) || [],
							source: "Harvard",
							medium: item.medium || "",
							dimensions: item.dimensions || "",
							artist: item.people?.[0]?.displayname || "",
							url: item.url || "",
							technique: item.technique || "",
							classification: item.classification || "",
						})
					);

					const metArtworks = metResponse.data.map((item: MetArtwork) => ({
						id: item.objectID,
						title: item.title,
						dated: item.objectDate,
						images: [item.primaryImage || ""],
						source: "Met",
						medium: item.medium || "",
						dimensions: item.dimensions || "",
						artist: item.artistDisplayName || "",
						url: item.objectURL || "",
						technique: item.classification || "",
						classification: item.classification || "",
					}));

					const maxLength = Math.max(
						harvardArtworks.length,
						metArtworks.length
					);
					const combinedArtworks = [];

					for (let i = 0; i < maxLength; i++) {
						if (i < harvardArtworks.length) {
							combinedArtworks.push(harvardArtworks[i]);
						}
						if (i < metArtworks.length) {
							combinedArtworks.push(metArtworks[i]);
						}
					}

					setArtworks(combinedArtworks);				
					setTotalArtworks(harvardResponse.total + metResponse.total);
				}
			} catch (error) {
				if (isMounted) console.error("Failed to fetch artworks:", error);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchAndSetArtworks();

		return () => {
			isMounted = false;
		};
	}, [searchObject.searchKey, currentPage]);

	// Filter artworks based on image filter preference
	const filteredArtworks = artworks.filter((artwork) => {
		const passesImageFilter =
			searchObject.hasImage ||
			(Array.isArray(artwork.images) &&
				artwork.images.length > 0 &&
				artwork.images.every(
					(image) => image && typeof image === "string" && image.trim() !== ""
				));

		return passesImageFilter;
	});

	// Handle page change
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	// Handle 'Go to page' functionality
	const handleGoToPage = () => {
		const pageNumber = parseInt(goToPage, 10);
		if (
			pageNumber > 0 &&
			pageNumber <= Math.ceil(totalArtworks / ITEMS_PER_PAGE)
		) {
			handlePageChange(pageNumber);
			setGoToPage("");
		}
	};

	// Update the image filter and store in localStorage
	const handleImageFilterChange = (value: boolean) => {
		setSearchObject((prev) => ({ ...prev, hasImage: value }));
		localStorage.setItem("hasImageFilter", JSON.stringify(value));
	};

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

			{/* Header Section */}
			<div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] items-center bg-gradient-to-r from-white to-[#ebefe0] drop-shadow-lg text-center py-6 lg:p-12">
				<div>
					<h1 className="lg:text-8xl text-4xl font-bold mb-8 px-4 lg:text-left text-center text-black">
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

			{/* Main Content Section */}
			<div className="bg-[#ebefe0]">
				<div className="max-w-screen-xl mx-auto">
					<div className="px-6 py-12">
						<SearchAndFilter
							visibleArtworksAmount={ITEMS_PER_PAGE}
							totalArtworks={totalArtworks}
							artworks={artworks}
							setSearchObject={setSearchObject}
							handleImageFilterChange={handleImageFilterChange}
						/>

						{loading ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
								{[...Array(ITEMS_PER_PAGE)].map((_, index) => (
									<Card key={index} className="overflow-hidden">
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
								))}
							</div>
						) : (
							<div className="grid grid-cols-4 gap-x-6 gap-y-12">
								{[0, 1, 2, 3].map((column) => (
									<div key={column} className="flex flex-col space-y-6">
										{filteredArtworks
											.filter((_, index) => index % 4 === column)
											.map((artwork, index) => (
												<Link
													key={artwork.id || `placeholder-${index}`}
													href={`/gallery/${
														artwork.source === "Harvard" ? "H" : "M"
													}/${encodeURIComponent(artwork.id)}`}
												>
													<Card
														className={`cursor-pointer overflow-hidden transform transition-transform hover:shadow-right-bottom md:hover:scale-105 z-10`}
													>
														<CardContent className="p-0">
															<div className="relative w-full">
																<Image
																	src={artwork.images[0] || PLACEHOLDER_IMAGE}
																	alt={artwork.title || "Untitled Artwork"}
																	width={500}
																	height={500}
																	style={{ objectFit: "contain" }}
																	loading="lazy"
																/>
															</div>
															<div className="p-4">
																<h3 className="font-semibold text-sm mb-1">
																	{artwork.title || "Untitled Artwork"}
																</h3>
																<p className="text-xs text-gray-600">
																	{artwork.dated || "Unknown Date"}
																</p>
															</div>
														</CardContent>
													</Card>
												</Link>
											))}
									</div>
								))}
							</div>
						)}

						{/* Pagination */}
						{searchObject.searchKey && totalArtworks > 0 && (
							<Pagination className="mt-8">
								<PaginationContent>
									<ul className="flex items-center space-x-1">
										<PaginationItem className="flex items-center space-x-1">
											<PaginationPrevious
												href="#"
												onClick={() =>
													handlePageChange(Math.max(1, currentPage - 1))
												}
												className={`border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ${
													currentPage === 1
														? "opacity-50 cursor-not-allowed"
														: "hover:cursor-pointer"
												}`}
											/>
										</PaginationItem>

										{/* Page numbers */}
										{[
											...Array.from(
												{ length: 5 },
												(_, index) => currentPage + index - 2
											),
										]
											.filter(
												(page) =>
													page > 0 &&
													page <= Math.ceil(totalArtworks / PAGE_SIZE)
											)
											.map((pageIndex) => (
												<PaginationItem key={pageIndex}>
													<PaginationLink
														href="#"
														onClick={() => handlePageChange(pageIndex)}
														className={`border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ${
															currentPage === pageIndex ? "font-bold" : ""
														}`}
													>
														{pageIndex}
													</PaginationLink>
												</PaginationItem>
											))}

										{/* Right ellipsis and last page */}
										{currentPage < Math.ceil(totalArtworks / PAGE_SIZE) - 3 && (
											<>
												<PaginationEllipsis className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground" />
												<PaginationItem>
													<PaginationLink
														href="#"
														onClick={() =>
															handlePageChange(
																Math.ceil(totalArtworks / PAGE_SIZE)
															)
														}
														className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
													>
														{Math.ceil(totalArtworks / PAGE_SIZE)}
													</PaginationLink>
												</PaginationItem>
											</>
										)}

										<PaginationItem>
											<PaginationNext
												href="#"
												onClick={() =>
													handlePageChange(
														Math.min(
															Math.ceil(totalArtworks / PAGE_SIZE),
															currentPage + 1
														)
													)
												}
												className={`border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ${
													currentPage === Math.ceil(totalArtworks / PAGE_SIZE)
														? "opacity-50 cursor-not-allowed"
														: "hover:cursor-pointer"
												}`}
											/>
										</PaginationItem>
									</ul>
									<div className="flex items-center space-x-2 translate-x-16">
										<span className="text-sm">Go to page</span>
										<Input
											type="number"
											min="1"
											max={Math.ceil(totalArtworks / PAGE_SIZE)}
											value={goToPage}
											onChange={(e) => setGoToPage(e.target.value)}
											className="border border-input w-16 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
										/>
										<span className="text-sm">
											/ {Math.ceil(totalArtworks / PAGE_SIZE)}
										</span>
										<Button onClick={handleGoToPage} size="default">
											Confirm
										</Button>
									</div>
								</PaginationContent>
							</Pagination>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
