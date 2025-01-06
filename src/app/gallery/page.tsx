"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import Image from "next/image";

import NavigationBar from "@/components/navigation-bar";
import GalleryCarousel from "@/components/gallery-carousel";
import Footer from "@/components/footer";

const artworks = [
	{
		id: 1,
		title: "Winter Landscape",
		date: "2025",
		image: "/images/winter-landscape.jpg",
	},
	{
		id: 2,
		title: "Urban Jungle",
		date: "2018",
		image: "/images/sample-artwork2.jpg",
	},
	{
		id: 3,
		title: "Ocean Breeze",
		date: "2020",
		image: "/images/sample-image5.jpg",
	},
	{
		id: 4,
		title: "The Ancient City",
		date: "2005",
		image: "/images/sample-artwork3.jpg",
	},
	{
		id: 5,
		title: "Mystical Woods",
		date: "2019",
		image: "/images/sample-collection-side1.jpg",
	},
	{
		id: 6,
		title: "Modern Minimalism",
		date: "2024",
		image: "/images/sample-image1.jpg",
	},
	{
		id: 7,
		title: "Reflections of Time",
		date: "2023",
		image: "/images/sample-collection-side2.jpg",
	},
	{
		id: 8,
		title: "Silent Waters",
		date: "2021",
		image: "/images/sample-artwork4.jpg",
	},
	{
		id: 9,
		title: "Golden Fields",
		date: "2017",
		image: "/images/sample-image4.jpg",
	},
	{
		id: 10,
		title: "Abstract Dreams",
		date: "2022",
		image: "/images/sample-collection-large.jpg",
	},
	{
		id: 11,
		title: "City Lights",
		date: "2023",
		image: "/images/sample-image3.jpg",
	},
	{
		id: 12,
		title: "Frozen Memories",
		date: "2016",
		image: "/images/sample-image2.jpg",
	},
	{
		id: 13,
		title: "The Ocean's Call",
		date: "2021",
		image: "/images/sample-image1.jpg",
	},
	{
		id: 14,
		title: "Eternal Sunset",
		date: "2020",
		image: "/images/sample-collection-side3.jpg",
	},
	{
		id: 15,
		title: "The Cat's Journey",
		date: "2015",
		image: "/images/sample-artwork1.jpg",
	},
	{
		id: 16,
		title: "Cosmic Voyage",
		date: "2024",
		image: "/images/sample-image3.jpg",
	},
	{
		id: 17,
		title: "Timeless Beauty",
		date: "2022",
		image: "/images/sample-artwork2.jpg",
	},
	{
		id: 18,
		title: "Abstract Horizons",
		date: "2023",
		image: "/images/sample-collection-large.jpg",
	},
	{
		id: 19,
		title: "Secret Pathways",
		date: "2021",
		image: "/images/sample-image2.jpg",
	},
	{
		id: 20,
		title: "Fading Light",
		date: "2020",
		image: "/images/sample-image5.jpg",
	},
	{
		id: 21,
		title: "Cleansing Rain",
		date: "2019",
		image: "/images/sample-collection-side2.jpg",
	},
	{
		id: 22,
		title: "Waves of Time",
		date: "2023",
		image: "/images/sample-image1.jpg",
	},
	{
		id: 23,
		title: "Rays of Hope",
		date: "2018",
		image: "/images/sample-collection-side1.jpg",
	},
	{
		id: 24,
		title: "The Last Dance",
		date: "2017",
		image: "/images/sample-artwork4.jpg",
	},
	{
		id: 25,
		title: "Whispers in the Forest",
		date: "2024",
		image: "/images/sample-image4.jpg",
	},
	{
		id: 26,
		title: "Firelight",
		date: "2021",
		image: "/images/sample-image3.jpg",
	},
	{
		id: 27,
		title: "The Hidden Valley",
		date: "2023",
		image: "/images/sample-artwork3.jpg",
	},
	{
		id: 28,
		title: "Under the Stars",
		date: "2020",
		image: "/images/sample-collection-side3.jpg",
	},
	{
		id: 29,
		title: "The Ancient Whisper",
		date: "2022",
		image: "/images/sample-image2.jpg",
	},
	{
		id: 30,
		title: "Frosted Path",
		date: "2018",
		image: "/images/sample-collection-large.jpg",
	},
	{
		id: 31,
		title: "The Dreamer",
		date: "2024",
		image: "/images/sample-collection-side1.jpg",
	},
	{
		id: 32,
		title: "Nightfall",
		date: "2023",
		image: "/images/sample-image5.jpg",
	},
	{
		id: 33,
		title: "Into the Wild",
		date: "2021",
		image: "/images/sample-artwork2.jpg",
	},
	{
		id: 34,
		title: "Whispers of Autumn",
		date: "2020",
		image: "/images/sample-artwork1.jpg",
	},
	{
		id: 35,
		title: "The Road Less Traveled",
		date: "2019",
		image: "/images/sample-image3.jpg",
	},
	{
		id: 36,
		title: "Shifting Shadows",
		date: "2023",
		image: "/images/sample-image4.jpg",
	},
	{
		id: 37,
		title: "Colors of the Earth",
		date: "2017",
		image: "/images/sample-image2.jpg",
	},
	{
		id: 38,
		title: "Serenity",
		date: "2024",
		image: "/images/sample-collection-side2.jpg",
	},
	{
		id: 39,
		title: "Sailing Beyond",
		date: "2022",
		image: "/images/sample-collection-side1.jpg",
	},
	{
		id: 40,
		title: "The Journey Home",
		date: "2025",
		image: "/images/sample-collection-large.jpg",
	},
];

export default function Gallery() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div>
			<NavigationBar />

			<Button variant="ghost" className="mt-12 ml-12 scale-[150%] mb-6">
				<ArrowLeft className=" h-4 w-4" />
				Home
			</Button>
			<div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] items-center bg-gradient-to-r from-white to-[#ebefe0] rounded-lg shadow-lg p-8 lg:p-12">
				<div>
					<h1 className="text-8xl font-bold mb-8 pl-6  text-black">
						Gallery
					</h1>
				</div>
				<p className="text-gray-600 lg:pt-16">
					Search, enjoy and discover millions of public domain images of
					artworks and cultural artifacts from around the world and dating back
					to the beginnings of civilization.
				</p>
			</div>
			<GalleryCarousel />
			<div className="bg-[#ebefe0] p-12">
				<h3 className="text-3xl font-bold mb-4">Search</h3>
				<div className="">
					<Input
						type="search"
						placeholder="Search for public domain artworks and artifacts"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full bg-white"
					/>
				</div>

				<div className="flex items-center space-x-2 mb-4">
					<div className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
						cats
						<Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0">
							<span className="sr-only">Remove</span>
							&times;
						</Button>
					</div>
					<Button variant="outline" size="sm">
						<Plus className="h-4 w-4 mr-1" />
						Add Filter
					</Button>
				</div>
				<p className="text-sm text-gray-600 my-6">1,223 Works</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{/* Grid 1 */}
					<div className="grid grid-cols-1 gap-4">
						{artworks
							.filter((_, index) => index % 4 === 0)
							.map((artwork) => (
								<Card key={artwork.id} className="overflow-hidden">
									<CardContent className="p-0">
										<div className="relative w-full">
											<Image
												src={artwork.image}
												alt={artwork.title}
												width={500}
												height={500}
												objectFit="contain"
											/>
										</div>
										<div className="p-4">
											<h3 className="font-semibold text-sm mb-1">
												{artwork.title}
											</h3>
											<p className="text-xs text-gray-600">{artwork.date}</p>
										</div>
									</CardContent>
								</Card>
							))}
					</div>

					{/* Grid 2 */}
					<div className="grid grid-cols-1 gap-4">
						{artworks
							.filter((_, index) => index % 4 === 1)
							.map((artwork) => (
								<Card key={artwork.id} className="overflow-hidden">
									<CardContent className="p-0">
										<div className="relative w-full">
											<Image
												src={artwork.image}
												alt={artwork.title}
												width={500}
												height={500}
												objectFit="contain"
											/>
										</div>
										<div className="p-4">
											<h3 className="font-semibold text-sm mb-1">
												{artwork.title}
											</h3>
											<p className="text-xs text-gray-600">{artwork.date}</p>
										</div>
									</CardContent>
								</Card>
							))}
					</div>

					{/* Grid 3 */}
					<div className="grid grid-cols-1 gap-4">
						{artworks
							.filter((_, index) => index % 4 === 2)
							.map((artwork) => (
								<Card key={artwork.id} className="overflow-hidden">
									<CardContent className="p-0">
										<div className="relative w-full">
											<Image
												src={artwork.image}
												alt={artwork.title}
												width={500}
												height={500}
												objectFit="contain"
											/>
										</div>
										<div className="p-4">
											<h3 className="font-semibold text-sm mb-1">
												{artwork.title}
											</h3>
											<p className="text-xs text-gray-600">{artwork.date}</p>
										</div>
									</CardContent>
								</Card>
							))}
					</div>

					{/* Grid 4 */}
					<div className="grid grid-cols-1 gap-4">
						{artworks
							.filter((_, index) => index % 4 === 3)
							.map((artwork) => (
								<Card key={artwork.id} className="overflow-hidden">
									<CardContent className="p-0">
										<div className="relative w-full">
											<Image
												src={artwork.image}
												alt={artwork.title}
												width={500}
												height={500}
												objectFit="contain"
											/>
										</div>
										<div className="p-4">
											<h3 className="font-semibold text-sm mb-1">
												{artwork.title}
											</h3>
											<p className="text-xs text-gray-600">{artwork.date}</p>
										</div>
									</CardContent>
								</Card>
							))}
					</div>
				</div>

				<div className="mt-8 text-center">
					<p className="text-sm text-gray-600 mb-4">20 of 1,223</p>
					<Button variant="outline" className="w-full">
						View More
					</Button>
				</div>
			</div>
			<Footer />
		</div>
	);
}
