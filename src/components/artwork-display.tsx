"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Download, Maximize2, Share2, Plus } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

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
		"/images/sample-artwork4.jpg",
	];

	return (
		<div className="bg-[#ebefe0] w-full">
		
			<div className="max-w-4xl mx-auto px-8 py-16">
				<h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>

				<div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
					<span>
						<strong>Creator:</strong> {artwork.creator}
					</span>
					<span>
						<strong>Cultural Context:</strong> {artwork.culturalContext}
					</span>
					<span>
						<strong>Date:</strong> {artwork.date}
					</span>
					<span>
						<strong>Source:</strong> {artwork.source}
					</span>
				</div>

				{/* Main Image Carousel */}
				<Carousel opts={{ align: "start" }} className="w-full pt-12">
					<CarouselContent>
						{gallerySample.map((imageSrc, index) => (
							<CarouselItem key={index} className="basis-1/1">
								<div className="p-2">
									<Card className="mb-4">
										<Image
											src={imageSrc}
											alt={artwork.title}
											width={800}
											height={600}
											className="w-full h-auto object-cover"
										/>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>

				{/* Action Buttons */}
				<div className="flex justify-between items-center ">
					<div className="flex gap-2 ml-auto">
						<Button>
							<Plus className="h-4 w-4 mr-2" />
							Add to Collection
						</Button>
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

				{/* Gallery Carousel */}
				<Carousel opts={{ align: "center" }} className="w-full max-w-2xl mx-auto pt-6">
					<CarouselContent>
						{gallerySample.map((imageSrc, index) => (
							<CarouselItem key={index} className="basis-1/4">
								<div className="p-1">
									<Card className="overflow-hidden">
										<Image
											src={imageSrc}
											alt={`Gallery image ${index + 1}`}
											width={400}
											height={300}
											className="w-full h-32 object-cover"
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
		</div>
	);
}
