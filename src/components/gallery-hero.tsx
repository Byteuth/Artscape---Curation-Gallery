"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";

import Image from "next/image";
import Link from "next/link";

const gallerySample = [
	{
		title: "Gold Flower",
		imgUrl: "https://images.metmuseum.org/CRDImages/gr/original/DP260372.jpg",
		dated: "ca. 2300–2100 BCE",
		source: "M",
		id: "252349",
	},
	{
		title: "House",
		imgUrl: "https://images.metmuseum.org/CRDImages/as/original/156471.jpg",
		dated: "mid- to late 1780s",
		source: "M",
		id: "62567",
	},
	{
		title: "Woman on a Striped Sofa with a Dog",
		imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:DDC252719_dynmc",
		dated: "1876",
		source: "H",
		id: "228130",
	},
	{
		title: "Frontispiece of the Figurine",
		imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:INV171585_dynmc",
		dated: "unknown",
		source: "H",
		id: "279384",
	},
	{
		title: "Angel",
		imgUrl:
			"https://images.metmuseum.org/CRDImages/es/original/DP-14477-001.jpg",
		dated: "ca. 1760–70",
		source: "M",
		id: "189692",
	},
	{
		title: "Cat figurine",
		imgUrl:
			"https://images.metmuseum.org/CRDImages/eg/original/30.8.104_EGDP014432.jpg",
		dated: "664–30 B.C.",
		source: "M",
		id: "572106",
	},
	{
		title: "Terracotta amphora (jar)",
		imgUrl: "https://images.metmuseum.org/CRDImages/gr/original/DP116936.jpg",
		dated: "ca. 530 BCE",
		source: "M",
		id: "255154",
	},
	{
		title: "A Meadow Irrigated by a River",
		imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:INV138376_dynmc",
		dated: "ca. 1840",
		source: "H",
		id: "239299",
	},
	{
		title: "The Adoration of the Magi",
		imgUrl:
			"https://images.metmuseum.org/CRDImages/ep/original/DP-31416-001.jpg",
		dated: "1519-1548",
		source: "M",
		id: "436504",
	},
	{
		title: "Landscape with Tobias and the Angel",
		imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:DDC254457_dynmc",
		dated: "c. 1620-1622",
		source: "H",
		id: "227512",
	},
	{
		title: "A Meadow Irrigated by a River",
		imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:INV138376_dynmc",
		dated: "ca. 1840",
		source: "H",
		id: "239299",
	},
	{
		title: "The Adoration of the Magi",
		imgUrl:
			"https://images.metmuseum.org/CRDImages/ep/original/DP-31416-001.jpg",
		dated: "1519-1548",
		source: "M",
		id: "436504",
	},
	{
		title: "Landscape with Tobias and the Angel",
		imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:DDC254457_dynmc",
		dated: "c. 1620-1622",
		source: "H",
		id: "227512",
	},
];

const suggestions = [
	{ title: "Explore Art History", color: "text-green-500" },
	{ title: "Discover Masterpieces", color: "text-blue-500" },
	{ title: "Journey Through Time", color: "text-purple-500" },
	{ title: "Cultural Heritage", color: "text-red-500" },
	{ title: "Artistic Excellence", color: "text-yellow-500" },
];

export default function GalleryHero() {
	const [currentSuggestion, setCurrentSuggestion] = useState(
		() => suggestions[0]
	);
	const [currentGallery, setCurrentGallery] = useState(() => gallerySample);
	const suggestionRef = useRef(null);
	const isMounted = useRef(false);

	const translateYClasses = {
		0: "translate-y-0",
		1: "translate-y-24",
		2: "translate-y-48",
		3: "translate-y-24",
		4: "translate-y-0",
	};

	// Handle suggestion rotation
	useEffect(() => {
		let index = 0;
		const interval = setInterval(() => {
			index = (index + 1) % suggestions.length;
			setCurrentSuggestion(suggestions[index]);
		}, 8000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			isMounted.current = true;
			const shuffledGallery = [...gallerySample].sort(
				() => Math.random() - 0.5
			);
			setCurrentGallery(shuffledGallery);
		}
	}, []);

	// Handle main carousel animations
	useEffect(() => {
		if (!isMounted.current) return;
		const carouselItems = document.querySelectorAll(".carousel-item");
		const suggestionElement = suggestionRef.current;

		if (!carouselItems.length || !suggestionElement) return;

		// Initial animations
		const tl = gsap.timeline();

		tl.fromTo(
			carouselItems,
			{
				opacity: 0,
				y: -100,
			},
			{
				opacity: 1,
				y: 0,
				duration: 1,
				stagger: 0.1,
				ease: "power2.out",
			}
		).fromTo(
			suggestionElement,
			{
				opacity: 0,
				y: -50,
			},
			{
				opacity: 1,
				y: 0,
				duration: 1,
				ease: "power2.out",
			},
			"-=0.5"
		);

		// Delay before fade-out animations
		const fadeOutTimeout = setTimeout(() => {
			gsap.to(carouselItems, {
				opacity: 0,
				duration: 1.5,
				stagger: 0.1,
				ease: "power2.out",
				y: -50,
			});

			gsap.to(suggestionElement, {
				opacity: 0,
				duration: 1,
				ease: "power2.out",
				y: -50,
				delay: 0.5,
			});
		}, 6400);

		return () => {
			clearTimeout(fadeOutTimeout);
			tl.kill();
		};
	}, [currentGallery, currentSuggestion]);

	return (
		<div className="relative w-full max-w-7xl mx-auto px-4 max-h-80vh">
			<div className="md:translate-y-16">
				<h2 className="text-8xl font-bold text-center mb-4">Gallery</h2>
				<h3
					ref={suggestionRef}
					className={`text-6xl text-center mb-24 transition-colors duration-500 ${currentSuggestion.color}`}
				>
					{currentSuggestion.title}
				</h3>
			</div>
			<div className="relative">
				{/* Gradient overlay for white shadow at the bottom */}
				<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

				<div
					className={`grid gap-4
					grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 translate-y-30 max-h-[480px]`}
				>
					{Array.from({ length: 5 }).map((_, carouselIndex) => {
						const translateYClass = translateYClasses[carouselIndex] || "";
						const gallerySlice = currentGallery.slice(
							carouselIndex * 2,
							carouselIndex * 2 + 4
						);

						return (
							<div
								key={`carousel-wrapper-${carouselIndex}`}
								className={`w-1/7 px-1 ${translateYClass}`}
							>
								<Carousel
									key={`carousel-${carouselIndex}`}
									opts={{
										align: "start",
									}}
									plugins={[
										Autoplay({
											delay: 2000,
										}),
									]}
									className="w-full"
									orientation="vertical"
								>
									<div>
										{gallerySlice.map((artwork, index) => (
											<div
												key={`${artwork.id}-${index}`}
												className="carousel-item pt-1 md:pt-2"
												suppressHydrationWarning
											>
												<Link href={`/gallery/${artwork.source}/${artwork.id}`}>
													<Card className="cursor-pointer transform transition-transform hover:shadow-lg hover:scale-105">
														<Image
															src={artwork.imgUrl || "/placeholder.svg"}
															alt={artwork.title || "Gallery artwork"}
															width={300}
															height={300}
															className="rounded-lg shadow-md object-cover w-full h-full"
															quality={85}
														/>
													</Card>
												</Link>
											</div>
										))}
									</div>
								</Carousel>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
