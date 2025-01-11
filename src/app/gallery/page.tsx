"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getArtworks } from "../actions/getArtworks";
import { applyFilters } from "../utils/applyFilters";

import NavigationBar from "@/components/navigation-bar";
import GalleryCarousel from "@/components/gallery-carousel";
import SearchAndFilter from "@/components/search-and-filter";
import Footer from "@/components/footer";

interface Artwork {
	copyright?: object;
	contextualtextcount?: number;
	creditline?: string;
	accesslevel?: number;
	dateoflastpageview?: string;
	classificationid?: number;
	division?: string;
	markscount?: number;
	publicationcount?: number;
	totaluniquepageviews?: number;
	contact?: string;
	colorcount?: number;
	rank?: number;
	id?: number;
	state?: object;
	verificationleveldescription?: string;
	period?: object;
	images?: object;
	worktypes?: object;
	imagecount?: number;
	totalpageviews?: number;
	accessionyear?: number;
	standardreferencenumber?: object;
	signed?: object;
	classification?: string;
	relatedcount?: number;
	verificationlevel?: number;
	primaryimageurl?: string;
	titlescount?: number;
	peoplecount?: number;
	style?: object;
	lastupdate?: string;
	commentary?: object;
	periodid?: object;
	technique?: string;
	edition?: object;
	description?: string;
	medium?: string;
	lendingpermissionlevel?: number;
	title?: string;
	accessionmethod?: string;
	colors?: object;
	provenance?: string;
	groupcount?: number;
	dated?: string;
	department?: string;
	dateend?: number;
	people?: object;
	url?: string;
	dateoffirstpageview?: string;
	century?: string;
	objectnumber?: string;
	labeltext?: object;
	datebegin?: number;
	culture?: string;
	exhibitioncount?: number;
	imagepermissionlevel?: number;
	mediacount?: number;
	objectid?: number;
	techniqueid?: number;
	dimensions?: string;
	seeAlso?: object;
}
interface SearchObject {
	keywords: string[];
	hasImage: boolean;
	searchKey: string;
}

export default function Gallery() {
	const [visibleArtworksAmount, setVisibleArtworksAmount] =
		useState<number>(12);
	const [artworks, setArtworks] = useState<Artwork[]>([]);
	const [artworksInfo, setArtworksInfo] = useState<object>({});
	const [searchObject, setSearchObject] = useState<SearchObject>({
		keywords: [],
		hasImage: false,
		searchKey: "",
	});

	const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const LOCAL_STORAGE_KEY = "gallery-search-state";

	useEffect(() => {
		const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (savedState) {
			const { searchObject: restoredSearchObject, filteredArtworks } =
				JSON.parse(savedState);
			setSearchObject(restoredSearchObject);

			// If there's a valid search key, fetch artworks and apply filters
			if (restoredSearchObject.searchKey.trim() !== "") {
				async function restoreArtworks() {
					setLoading(true);
					try {
						const data = await getArtworks(restoredSearchObject.searchKey);
						setArtworks(data);
					} catch (error) {
						console.error("Failed to fetch artworks during restore:", error);
					} finally {
						setLoading(false);
					}
				}

				restoreArtworks();
			} else {
				// No search key, restore empty filtered artworks
				setFilteredArtworks(filteredArtworks);
			}
		}
	}, [])	;

	useEffect(() => {
		const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (savedState) {
			const { searchObject: restoredSearchObject } =
				JSON.parse(savedState);
			setSearchObject(restoredSearchObject);
			console.log(restoredSearchObject)
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
			if (searchObject.searchKey.trim() === "") {
				setArtworks([]);
				return;
			}

			setLoading(true);
			try {
				const data = await getArtworks(searchObject.searchKey);
				setArtworks(data.records);
				setArtworksInfo(data.info);
			} catch (error) {
				console.error("Failed to fetch artworks:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchArtworks();
	}, [searchObject.searchKey]);

	useEffect(() => {
		const filtered = applyFilters(artworks, searchObject);
		setFilteredArtworks(filtered);
	}, [searchObject, artworks]);

	const loadMore = () => {
		setVisibleArtworksAmount((prev) => prev + 12);
	};

	useEffect(() => {
		console.log(artworksInfo);
	}, [artworksInfo]);

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
												// Fallback values
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

						{visibleArtworksAmount < filteredArtworks.length &&
							visibleArtworksAmount > 0 && (
								<div className="mt-8 text-center">
									<p className="text-sm text-gray-600 mb-4">
										Showing{" "}
										{Math.min(visibleArtworksAmount, filteredArtworks.length)}{" "}
										of {filteredArtworks.length}
									</p>
									<Button
										variant="outline"
										className="w-full"
										onClick={loadMore}
									>
										View More
									</Button>
								</div>
							)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
