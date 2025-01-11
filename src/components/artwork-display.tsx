"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
import Autoplay from "embla-carousel-autoplay";

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
	images?: { baseimageurl: string }[];
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
	people?: { name: string }[];
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

function ArtworkDetailItem({
	label,
	value,
}: {
	label: string;
	value: string | undefined;
}) {
	return value ? (
		<div className="mb-4">
			<dt className="text-sm font-medium text-gray-500">{label}</dt>
			<dd className="mt-1 text-sm text-gray-900">{value}</dd>
		</div>
	) : null;
}

export default function ArtworkDisplay({ artwork }: { artwork: Artwork }) {
	const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);
	const [autoPlay, setAutoPlay] = React.useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const pathName = usePathname();
	const isMainPage = pathName === "/";

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

	useEffect(() => {
		if (isMainPage) {
			setAutoPlay(false);
		}
	}, [isMainPage]);

	useEffect(() => {
		console.log(artwork);
	}, [artwork]);

	const handleThumbnailClick = (index: number) => {
		if (carouselApi) {
			setAutoPlay(false);
			carouselApi.scrollTo(index);
		}
	};

	const carouselPlugins = autoPlay ? [Autoplay({ delay: 4000 })] : [];
	const images = artwork.images || [];

	return (
		<div className="bg-[#ebefe0]">
			<div className="w-full max-w-[1000px] mx-auto">
				<div className="p-8 mx-auto py-8">
					<h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
					<div className="flex flex-wrap pb-8 text-sm text-gray-600">
						<div className="w-full md:flex-1 pb-3">
							<span className="block font-bold">Creator:</span>
							<span className="block">
								{artwork?.people?.[0]?.name || "Unknown"}
							</span>
						</div>
						<div className="w-full md:flex-1 pb-3">
							<span className="block font-bold">Cultural Context:</span>
							<span className="block">{artwork.culture || "Unknown"}</span>
						</div>
						<div className="w-full md:flex-1 pb-3">
							<span className="block font-bold">Date:</span>
							<span className="block">{artwork.dated || "Unknown"}</span>
						</div>
						<div className="w-full md:flex-1 pb-3">
							<span className="block font-bold">Source:</span>
							<span className="block">{artwork.creditline || "Unknown"}</span>
						</div>
					</div>
					{/* Main Image Carousel */}
					<Carousel
						opts={{
							align: "start",
						}}
						plugins={carouselPlugins}
						className="w-auto"
						setApi={setCarouselApi}
					>
						<CarouselContent>
							{images.map((image, index) => (
								<CarouselItem key={index}>
									<Card>
										<Image
											src={image.baseimageurl}
											alt={artwork.title || "Artwork"}
											width={800}
											height={600}
											className="w-full max-auto object-cover rounded-xl"
										/>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
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
													src={image.baseimageurl}
													alt={`Gallery image ${index + 1}`}
													width={400}
													height={300}
													className={`max-h-[300px] max-w-24 md:max-w-44 lg:rounded-lg rounded-sm object-cover ${
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
							<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
								<ArtworkDetailItem label="Medium" value={artwork.medium} />
								<ArtworkDetailItem
									label="Technique"
									value={artwork.technique}
								/>
								<ArtworkDetailItem
									label="Dimensions"
									value={artwork.dimensions}
								/>
								<ArtworkDetailItem
									label="Classification"
									value={artwork.classification}
								/>
								<ArtworkDetailItem
									label="Department"
									value={artwork.department}
								/>
								<ArtworkDetailItem
									label="Object Number"
									value={artwork.objectnumber}
								/>
								<ArtworkDetailItem
									label="Accession Year"
									value={artwork.accessionyear?.toString()}
								/>
								<ArtworkDetailItem label="Date" value={artwork.dated} />
							</dl>
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
							{artwork.provenance && (
								<>
									<Separator className="my-4" />
									<div>
										<dt className="text-sm font-medium text-gray-500 mb-2">
											Provenance
										</dt>
										<dd className="mt-1 text-sm text-gray-900">
											{artwork.provenance}
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
