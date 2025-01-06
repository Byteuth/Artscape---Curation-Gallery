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

export default function GalleryCarousel() {
	const gallerySample = [
		"/images/sample-image1.jpg",
		"/images/sample-image2.jpg",
		"/images/sample-image3.jpg",
		"/images/sample-image4.jpg",
		"/images/sample-image5.jpg",
		"/images/sample-image1.jpg",
		"/images/sample-image2.jpg",
		"/images/sample-image3.jpg",
		"/images/sample-image4.jpg",
		"/images/sample-image5.jpg",
		"/images/sample-image1.jpg",
		"/images/sample-image2.jpg",
		"/images/sample-image3.jpg",
		"/images/sample-image4.jpg",
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
		<div className="bg-[#ffffff] flex flex-col justify-center items-center p-16 w-full ">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
				{/* Carousel Section */}
				<Carousel
					opts={{
						align: "start",
					}}
					plugins={[
						Autoplay({
							delay: 2000,
						}),
					]}
					className="w-full pt-12"
				>
					<CarouselContent>
						{gallerySample.map((imageSrc, index) => (
							<CarouselItem
								key={index}
								className="carousel-item md:basis-1/4 lg:basis-1/6"
							>
								<div className="p-1">
									<Card
										className={`transform transition-transform ${
											index % 2 === 1 ? "scale-50" : "scale-100"
										}`}
									>
										<Image
											src={imageSrc}
											alt={`sample-image${index}`}
											width={600}
											height={300}
											className="rounded-lg shadow-md"
										/>
										<span className="text-sm relative left-1/2">
											{index + 1}
										</span>
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
