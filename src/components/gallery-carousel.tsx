"use client";
import { useEffect } from "react";
import gsap from "gsap";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function GalleryCarousel() {
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
	];

	useEffect(() => {
		const carouselItems = document.querySelectorAll(".carousel-item");

		gsap.fromTo(
			carouselItems,
			{
				opacity: 0,
				x: -200,
			},
			{
				opacity: 1,
				x: 0,
				duration: 1,
				stagger: 0.2,
				ease: "power2.out",
			}
		);
	}, []);

	return (
		<div className="bg-[#ffffff] flex flex-col justify-center items-center   px-12 w-full">
			<div className="container mx-auto px-4 lg:px-8">
				<Carousel
					opts={{
						align: "start",
					}}
					plugins={[
						Autoplay({
							delay: 2000,
						}),
					]}
					className="w-full"
				>
					<CarouselContent className="flex">
						{gallerySample.map((artwork, index) => (
							<CarouselItem
								key={index}
								className="carousel-item md:basis-1/4 lg:basis-1/6 py-7 flex justify-center items-center"
							>
								<div className="p-1">
									<Link href={`/gallery/${artwork.source}/${artwork.id}`} >
										<Card
											className={`cursor-pointer transform transition-transform hover:shadow-right-bottom ${
												index % 2 === 1
													? "md:scale-50 scale-100 hover:md:scale-[0.825] hover:scale-125"
													: "scale-100 hover:scale-125"
											}`}
											onClick={() => console.log("clicked")}
										>
											<Image
												src={artwork.imgUrl}
												alt={`sample-image${index}`}
												width={200}
												height={200}
												className="rounded-lg shadow-md object-cover"
											/>
										</Card>
									</Link>
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
