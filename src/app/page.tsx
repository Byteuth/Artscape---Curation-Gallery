import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import ArtworkDisplay from "@/components/artwork-display";
import CollectionSection from "@/components/collection-section";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

export default function Home() {
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

	return (
		<main className="flex flex-col row-start-2 items-center sm:items-start min-h-screen">
			<NavigationBar />
			<section
				id="hero"
				className="bg-[#ebefe0] flex flex-col justify-center items-center p-16 w-full"
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h1 className="text-8xl md:text-12xl font-bold mb-2">
							Through the Canvas
						</h1>
						<p className="text-2xl md:text-4xl text-center mx-auto md:translate-x-12 lg:translate-x-24">
							by -t Uth
						</p>
					</div>
					<div className="flex flex-col md:flex-row items-center gap-8 w-full">
						<div className="w-full md:w-1/2 flex justify-center relative">
							<div className="relative">
								<Image
									src="/images/winter-landscape.jpg"
									alt="Through the Canvas"
									width={600}
									height={300}
									className="rounded-lg shadow-md"
								/>
								<div className="absolute top-0 left-0 text-sm -translate-y-5  translate-x-1 rounded-sm">
									PAINTING
								</div>
								<div className="absolute top-0 right-0 text-sm -translate-y-5  -translate-x-1 selection:rounded-sm">
									BASED IN ITALY
								</div>
							</div>
						</div>
						<div className="w-full md:w-1/2">
							<p className="text-lg md:text-xl text-black">
								Through the Canvas is a free online resource that brings
								together arts and culture communities to find, share,
								collaborate, and reimagine cultural narratives.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section
				id="Gallery"
				className="bg-[#ffffff] flex flex-col justify-center items-center p-16 w-full "
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
					{/* Header Section */}
					<div className="mb-8 text-left ">
						<h2 className="text-4xl font-bold mb-2">Gallery</h2>
						<p className="text-lg text-gray-600">
							Explore digital images from museums open access collections.
						</p>

						<p className="inline-block underline font-medium py-2 rounded-md cursor-pointer transition-colors duration-300">
							View All
						</p>
					</div>

					{/* Carousel Section */}
					<Carousel
						opts={{
							align: "start",
						}}
						className="w-full pt-12"
					>
						<CarouselContent>
							{gallerySample.map((imageSrc, index) => (
								<CarouselItem key={index} className="md:basis-1/4 lg:basis-1/6">
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
			</section>
			<section
				id="Singular-Image"
				className="bg-[#ebefe0] flex flex-col justify-center items-center p-16 w-full"
			>
				<ArtworkDisplay />
			</section>
			<section
				id="Collection-Section"
				className="bg-[#ffffff] flex flex-col justify-center items-center p-16 w-full "
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
					{/* Header Section */}
					<div className="mb-8 text-left ">
						<h2 className="text-4xl font-bold mb-2">Curated Collections</h2>
						<p className="text-lg text-gray-600">
							Our editorial team and collaborators curate collections from the
							archive to unearth and highlight connections between cultural
							objects across institutions.
						</p>

						<p className="inline-block underline font-medium py-2 rounded-md cursor-pointer transition-colors duration-300">
							View All
						</p>
					</div>
				</div>
				<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16  w-full max-w-[1200px] mx-auto">
					{Array.from({ length: 6 }).map((_, index) => {
						return (
							<CollectionSection
								key={index}
								id="d545e127-8724-4f8d-977d-a8c337d3eb51"
								title="Women Artists at the World's Fair"
								author={{
									name: "Reina Gattuso",
									id: "6382fd15-7c78-4c58-9e91-58ed157b26d7",
								}}
								mainImage={{
									src: "/images/sample-collection-large.jpg",
									alt: "An Old Fisherman's Wife",
								}}
								sideImages={[
									{
										src: "/images/sample-collection-side1.jpg",
										alt: "Breton Girl Looking After Plants in the Hothouse",
									},
									{
										src: "/images/sample-collection-side2.jpg",
										alt: "Portrait of Cecilie Trier, née Melchior",
									},
									{
										src: "/images/sample-collection-side3.jpg",
										alt: "A Limier Briquet Hound",
									},
								]}
							/>
						);
					})}
				</div>
			</section>
			<section
				id="Footer"
				className="bg-[#B6B8A2] flex flex-col justify-center items-center p-16 w-full"
			>
				<Footer />
			</section>
		</main>
	);
}
