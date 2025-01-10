"use client";
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
import { Download, Maximize2, Share2, Plus } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function ArtworkDisplay() {
	const artwork = {
		title: "Polyhedron Model by Martin Berman, Regular Tetrahedron",
		creator: "Berman, Martin",
		culturalContext: "--",
		date: "1970s",
		source: "National Museum of American History",
		imageUrl:
			"https://d3pb8wc1i7do49.cloudfront.net/900x/https://ids.si.edu/ids/download?id=NMAH-DOR2014-00634.jpg",
	};

	const gallerySample = [
		"/images/sample-artwork1.jpg",
		"/images/sample-artwork2.jpg",
		"/images/sample-artwork3.jpg",
		"/images/sample-artwork2.jpg",
		"/images/sample-artwork2.jpg",
		"/images/sample-artwork2.jpg",
	];

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

	const handleThumbnailClick = (index: number) => {
		if (carouselApi) {
			setAutoPlay(false);
			carouselApi.scrollTo(index);
		}
	};
	const carouselPlugins = autoPlay ? [Autoplay({ delay: 4000 })] : [];

	return (
		<div className="bg-[#ebefe0] w-full">
			<div className="max-w mx-auto px-8 py-8">
				<h1 className="text-3xl font-bold pb-8">{artwork.title}</h1>

				<div className="flex flex-wrap pb-8 text-sm text-gray-600">
					<div className="w-full md:flex-1 pb-3">
						<span className="block font-bold">Creator:</span>
						<span className="block">{artwork.creator}</span>
					</div>
					<div className="w-full md:flex-1 pb-3">
						<span className="block font-bold">Cultural Context:</span>
						<span className="block">{artwork.culturalContext}</span>
					</div>
					<div className="w-full md:flex-1 pb-3">
						<span className="block font-bold">Date:</span>
						<span className="block">{artwork.date}</span>
					</div>
					<div className="w-full md:flex-1 pb-3">
						<span className="block font-bold">Source:</span>
						<span className="block">{artwork.source}</span>
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
						{gallerySample.map((imageSrc, index) => (
							<CarouselItem key={index} className="">
								<Card className=" ">
									<Image
										src={imageSrc}
										alt={artwork.title}
										width={800}
										height={600}
										className=" w-full object-cover rounded-xl "
									/>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>

				<div className="flex justify-between items-center mt-1 ">
					<div className="flex ml-auto">
						{!isLoggedIn ? (
							<HoverCard>
								<HoverCardTrigger>
									<Button
										className={`mr-3 bg-gray-500 hover:bg-gray-500 text-sm cursor-not-allowed`}
										
									>
										<Plus className="h-4 w-4 " />
										Add to Collection
									</Button>
								</HoverCardTrigger>
								<HoverCardContent className="bg-black text-white border-black text-sm font-bold">
									<span>
										Want to add to a collection?{" "}
										<span className=" underline cursor-pointer">Log in</span> or{" "}
										<span className=" underline cursor-pointer">
											Create an account
										</span>
										!
									</span>
								</HoverCardContent>
							</HoverCard>
						) : (
							<Button className={`mr-3`}>
								<Plus className="h-4 w-4 " />
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
				<div className="pt-4">
					{/* Gallery Carousel */}
					<Carousel opts={{ align: "center" }} className="mx-10">
						<CarouselContent>
							{gallerySample.map((imageSrc, index) => (
								<CarouselItem
									key={index}
									className={`basis-1/${gallerySample.length} overflow-hidden lg:max-h-[300px] lg:max-w-[150px] max-h-[150px] max-w-[75px]
									`}
									onClick={() => handleThumbnailClick(index)}
								>
									<div className="-ml-2">
										<Card>
											<Image
												src={imageSrc}
												alt={`Gallery image ${index + 1}`}
												width={400}
												height={300}
												className={`w-full lg:rounded-lg rounded-sm object-cover ${
													index === currentIndex ? "border-4 border-black " : ""
												}`}
											/>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>

				{/* Action Buttons */}
			</div>
		</div>
	);
}
