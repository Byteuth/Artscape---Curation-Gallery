"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";

import Image from "next/image";
import Link from "next/link";

const gallerySample = [
	[
		{
			title: "Figurine of a Dog",
			imgUrl: "https://images.metmuseum.org/CRDImages/eg/original/DP349853.jpg",
			dated: "ca. 2300–2100 BCE",
			source: "M",
			id: "252349",
		},
		{
			title: "Dog",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:INV002119_dynmc",
			dated: "mid- to late 1780s",
			source: "M",
			id: "62567",
		},
		{
			title: "The Dog Wallah",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:DDC108702_dynmc",
			dated: "1876",
			source: "H",
			id: "228130",
		},
		{
			title: "The Wounded Dog",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:73978_dynmc",
			dated: "unknown",
			source: "H",
			id: "279384",
		},
		{
			title: "Marie Emilie Coignet de Courson",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/ep/original/DP-1019-01.jpg",
			dated: "ca. 1760–70",
			source: "M",
			id: "189692",
		},
		{
			title: "Limestone dog",
			imgUrl: "https://images.metmuseum.org/CRDImages/gr/original/DP269822.jpg",
			dated: "664–30 B.C.",
			source: "M",
			id: "572106",
		},
		{
			title: "Seated dog",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/ao/original/75B_18BR2.jpg",
			dated: "ca. 530 BCE",
			source: "M",
			id: "255154",
		},
		{
			title: "Limestone statuette of a coursing hound seizing a hare",
			imgUrl: "https://images.metmuseum.org/CRDImages/gr/original/DP263921.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "From the Dogs series",
			imgUrl: "https://images.metmuseum.org/CRDImages/dp/original/DP831743.jpg",
			dated: "1519-1548",
			source: "M",
			id: "436504",
		},
		{
			title: "LFrom the Dogs series 2",
			imgUrl: "https://images.metmuseum.org/CRDImages/dp/original/DP831742.jpg",
			dated: "c. 1620-1622",
			source: "H",
			id: "227512",
		},
		{
			title: "Musette, a Maltese dog",
			imgUrl: "https://images.metmuseum.org/CRDImages/es/original/DP314807.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Siberian Wolf Hound,",
			imgUrl: "https://images.metmuseum.org/CRDImages/dp/original/DP821790.jpg",
			dated: "1519-1548",
			source: "M",
			id: "436504",
		},
		{
			title: "Sportsman and Dogs",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:INV198778_dynmc",
			dated: "c. 1620-1622",
			source: "H",
			id: "227512",
		},
	],
	[
		{
			title: "Peace and Plenty",
			imgUrl: "https://images.metmuseum.org/CRDImages/ad/original/DP159755.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Mountains",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:INV010253_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Mountainss",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:INV010254_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "A Farm in Brittany",
			imgUrl: "https://images.metmuseum.org/CRDImages/ep/original/DP123847.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Flower Garden",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/ad/original/DP-21451-001.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Farm Scene",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/rl/original/DP-22055-001.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "The Repast of the Lion",
			imgUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT50.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Lady with Three Peacocks ",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:ISL10058_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Carrots",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:51966_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Walnut Branch",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:74077_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Garden",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:INV009833_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "The Monet Family in Their Garden at Argenteuil",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/ep/original/DP-25465-001.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Flower Study",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:INV010856_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
	],
	[
		{
			title: "Nicholas Boylston",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:LEG257034",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "The House of Bijapur",
			imgUrl: "https://images.metmuseum.org/CRDImages/is/original/DP231353.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Portrait of Napoleon I",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/es/original/DP-25866-001.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Edward Charles Pickering",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:74527_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Portrait of a woman",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:70813_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Madonna and Child",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/ep/original/DP-26882-001.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Nicholas Boylston",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:DDC104940_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "The Vision of Saint John",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/ep/original/DP-17641-001.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Sebastián Martínez y Pérez",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/ep/original/DP-28009-001.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title:
				"Virgin and Child with the Young Saint John the Baptist and Angels",
			imgUrl: "https://images.metmuseum.org/CRDImages/ep/original/DP123935.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Saints Peter",
			imgUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT2838.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "The Temptation",
			imgUrl: "https://images.metmuseum.org/CRDImages/ep/original/DP124058.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Don Gaspar de Guzmán",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/ep/original/DP-14936-011.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
	],
	[
		{
			title: "Jewish Woman of Algiers",
			imgUrl: "https://images.metmuseum.org/CRDImages/es/original/DP250149.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Head of a Guardian Figure",
			imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:VRS45092_dynmc",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Buddha Maitreya",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/as/original/DP170102.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "The Little Fourteen-Year-Old Dancer",
			imgUrl: "https://images.metmuseum.org/CRDImages/es/original/DP-14939-002.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Spinario ",
			imgUrl: "https://images.metmuseum.org/CRDImages/es/original/DP248736.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Paris",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/es/original/DP229778.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Saint Catherine of Alexandria",
			imgUrl: "https://images.metmuseum.org/CRDImages/md/original/DP159988.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Seated Buddha",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/as/original/DP123364.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Shrine of the Virgin",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/md/original/DP266473.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title:
				"Unique Forms of Continuity in Space",
			imgUrl: "https://images.metmuseum.org/CRDImages/ma/original/DT6411.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Tomb Effigy Bust of Marie de France (1327-41), daughter of Charles IV of France and Jeanne d'Evreux",
			imgUrl: "https://images.metmuseum.org/CRDImages/md/original/DT135.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Woman's Head",
			imgUrl: "https://images.metmuseum.org/CRDImages/ma/original/DT203050.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
		{
			title: "Satyr",
			imgUrl:
				"https://images.metmuseum.org/CRDImages/es/original/DP-612-001.jpg",
			dated: "ca. 1840",
			source: "H",
			id: "239299",
		},
	],
];

const suggestions = [
	{ title: "Dogs", color: "text-yellow-500", images: gallerySample[0] },
	{
		title: "Vegetation",
		color: "text-green-500",
		images: gallerySample[1],
	},
	{
		title: "Paintings",
		color: "text-orange-500",
		images: gallerySample[2],
	},
	{
		title: "Sculptures",
		color: "text-blue-500",
		images: gallerySample[3],
	},
];

export default function GalleryHero() {
	const [currentSuggestion, setCurrentSuggestion] = useState(
		() => suggestions[0]
	);
	const [currentGallery, setCurrentGallery] = useState(
		() => currentSuggestion.images
	);
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
			const newSuggestion = suggestions[index];
			setCurrentSuggestion(newSuggestion);
			// Update gallery when suggestion changes
			const shuffledGallery = [...newSuggestion.images].sort(
				() => Math.random() - 0.5
			);
			setCurrentGallery(shuffledGallery);
		}, 8000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			isMounted.current = true;
			const shuffledGallery = [...currentSuggestion.images].sort(
				() => Math.random() - 0.5
			);
			setCurrentGallery(shuffledGallery);
		}
	}, [currentSuggestion]);

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
				<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 translate-y-30 max-h-[480px] overflow-hidden">
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
