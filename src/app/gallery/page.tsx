"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getArtworks } from "../actions/getArtworks";

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

export default function Gallery() {
	const [visibleArtworks, setVisibleArtworks] = useState<number>(12);
	const [artworks, setArtworks] = useState<Artwork[]>([]);
	// const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function fetchArtworks() {
			setLoading(true);
			try {
				const data = await getArtworks();
				setArtworks(data);
			} catch (error) {
				console.error("Failed to fetch artworks:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchArtworks();
	}, []);

	const loadMore = () => {
		setVisibleArtworks((prev) => prev + 12);
	};

	return (
		<div>
			<NavigationBar />
			<Link href="/">
				<Button variant="ghost" className="mt-12 ml-12 scale-[150%] mb-6">
					<ArrowLeft className=" h-4 w-4" />
					Home
				</Button>
			</Link>
			<div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] items-center bg-gradient-to-r from-white to-[#ebefe0] drop-shadow-lg p-8 lg:p-12 ">
				<div>
					<h1 className="text-8xl font-bold mb-8 pl-6  text-black">Gallery</h1>
				</div>
				<p className="text-gray-600 ">
					Search, enjoy and discover millions of public domain images of
					artworks and cultural artifacts from around the world and dating back
					to the beginnings of civilization.
				</p>
			</div>
			<GalleryCarousel />

			<div className="bg-[#ebefe0] ">
				<div className="max-w-screen-xl mx-auto ">
					<div className="p-12">
						<SearchAndFilter
							visibleArtworks={visibleArtworks}
							length={artworks.length}
							artworks={artworks.filter(
								(artwork) => artwork.medium !== undefined
							)}
						/>

						{loading ? (
							<p className="text-center text-gray-600">Loading artworks...</p>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
								{[0, 1, 2, 3].map((gridIndex) => (
									<div key={gridIndex} className="grid grid-cols-1 gap-6">
										{artworks
											.slice(0, visibleArtworks)
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
													"/images/artwork-frame-placeholder.jpg";
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

						{visibleArtworks < artworks.length && visibleArtworks > 0 && (
							<div className="mt-8 text-center">
								<p className="text-sm text-gray-600 mb-4">
									Showing {Math.min(visibleArtworks, artworks.length)} of{" "}
									{artworks.length}
								</p>
								<Button variant="outline" className="w-full" onClick={loadMore}>
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
