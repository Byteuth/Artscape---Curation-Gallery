"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Maximize2, Share2, Plus } from "lucide-react";

import { Artwork } from "@/types";
import { Skeleton } from "./ui/skeleton";

export default function ArtworkDisplay({
	artwork,
	loading,
}: {
	artwork: Artwork;
	loading: boolean;
}) {
	const [carouselApi] = React.useState<CarouselApi>();
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);
	const [isLoggedIn] = React.useState<boolean>(false);
	useEffect(() => {
		if (!carouselApi) return;

		const onSelect = () => {
			setCurrentIndex(carouselApi.selectedScrollSnap());
		};
		carouselApi.on("select", onSelect);

		return () => {
			carouselApi.off("select", onSelect);
		};
	}, [carouselApi]);


	const handleThumbnailClick = (index: number) => {
		setCurrentIndex(index);
		if (carouselApi) {
			carouselApi.scrollTo(index);
		}
	};
	const images = artwork?.images || [];
	// console.log(artwork);
	return (
		<div className="bg-[#ebefe0]">
			<div className="w-full max-w-[1000px] mx-auto">
				<div className="p-8 mx-auto py-8">
					<h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
					<div className="flex flex-wrap pb-8 text-sm text-gray-600">
						<div className="w-full md:flex-1 pb-3">
							<span className="block font-bold">Creator:</span>
							<span className="block">{artwork?.artist || "Unknown"}</span>
						</div>
						<div className="w-full md:flex-1 pb-3">
							<span className="block font-bold">Nationality:</span>
							<span className="block">
								{artwork.artistNationality || "Unknown"}
							</span>
						</div>
						<div className="w-full md:flex-1 pb-3">
							<span className="block font-bold">Date:</span>
							<span className="block">{artwork.dated || "Unknown"}</span>
						</div>
						<div className="w-full md:flex-1 pb-3">
							<span className="block font-bold">Source:</span>
							<span className="block">{artwork.source || "Unknown"}</span>
						</div>
					</div>
					{/* Main Image*/}
					<section>
						{loading ? (
							<Skeleton className="w-full h-[600px] rounded-xl" />
						) : (
							<Card>
								<Image
									src={images[currentIndex] || "/images/placeholder-image.png"}
									alt={artwork.title || "Artwork"}
									width={800}
									height={600}
									className="w-full max-auto max-h-[1000px] object-contain rounded-xl"
								/>
							</Card>
						)}
					</section>

					<div className="flex justify-between items-center mt-1">
						<div className="flex ml-auto">
							{!isLoggedIn ? (
								<HoverCard>
									<HoverCardTrigger>
										<Button className="mr-3 bg-gray-500 hover:bg-gray-500 text-sm cursor-not-allowed">
											<Plus className="h-4 w-4" />
											Add to Collection
										</Button>
									</HoverCardTrigger>
									<HoverCardContent className="bg-black text-white border-black text-sm font-bold">
										<span>
											Want to add to a collection?{" "}
											<span className="underline cursor-pointer">Log in</span>{" "}
											or{" "}
											<span className="underline cursor-pointer">
												Create an account
											</span>
											!
										</span>
									</HoverCardContent>
								</HoverCard>
							) : (
								<Button className="mr-3">
									<Plus className="h-4 w-4" />
									Add to Collection
								</Button>
							)}

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
					{images.length > 1 && (
						<div className="pt-4">
							{/* Gallery Carousel */}
							<Carousel
								opts={{ align: "center" }}
								className="mx-10 items-center"
							>
								<CarouselContent>
									{images.map((image, index) => (
										<CarouselItem
											key={index}
											className={`basis-1/${Math.ceil(
												images.length / 2
											)} h-auto`}
											onClick={() => handleThumbnailClick(index)}
										>
											<Card>
												<Image
													src={image}
													alt={`Gallery image ${index + 1}`}
													width={400}
													height={300}
													className={` max-w-24 md:max-w-44 lg:rounded-lg rounded-sm object-cover ${
														index === currentIndex
															? "border-4 border-gray-800"
															: ""
													}`}
												/>
											</Card>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious />
								<CarouselNext />
							</Carousel>
						</div>
					)}

					{/* Artwork Details */}
					<section className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="px-4 py-5 sm:p-6">
							<h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
								Artwork Details
							</h3>
							<Separator className="my-4" />

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{/* Group 1: Basic Details */}
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Title
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.title || "N/A"}
									</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Dated
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.dated || "N/A"}
									</dd>
								</div>

								{/* Group 2: Artist Details */}
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Artist
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.artist || "Unknown"}
									</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Nationality
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.artistNationality || "Unknown"}
									</dd>
								</div>

								{/* Group 3: Medium and Technique */}
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Medium
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.medium || "N/A"}
									</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Technique
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.technique || "N/A"}
									</dd>
								</div>

								{/* Group 4: Dimensions and Classification */}
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Dimensions
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.dimensions || "N/A"}
									</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Classification
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.classification || "N/A"}
									</dd>
								</div>

								{/* Group 5: Period and Credit Line */}
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Period
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.period || "N/A"}
									</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Credit Line
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.creditLine || "N/A"}
									</dd>
								</div>

								{/* Group 6: Department and Country */}
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Department
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.department || "N/A"}
									</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500 mb-2">
										Country
									</dt>
									<dd className="mt-1 text-sm text-gray-900">
										{artwork.country || "N/A"}
									</dd>
								</div>
							</div>

							{/* Description */}
							{artwork.description && (
								<>
									<Separator className="my-4" />
									<div>
										<dt className="text-sm font-medium text-gray-500 mb-2">
											Description
										</dt>
										<dd className="mt-1 text-sm text-gray-900">
											{artwork.description}
										</dd>
									</div>
								</>
							)}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
