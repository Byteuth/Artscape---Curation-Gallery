import Link from "next/link";

import NavigationBar from "@/components/navigation-bar";
import Hero from "@/components/hero";
import GalleryCarousel from "@/components/gallery-carousel";
import ArtworkDisplay from "@/components/artwork-display";
import CollectionSection from "@/components/collection-section";
import Footer from "@/components/footer";

const collections = [
	{
		key: 1,
		id: "1",
		title: "Whimsical Horizons",
		author: {
			name: "Alex Monroe",
			id: "auth1",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A breathtaking whimsical horizon view",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Abstract art with vibrant colors",
			},
			{
				src: "/images/sample-collection-side2.jpg",
				alt: "Serene side landscape in autumn",
			},
			{
				src: "/images/sample-image5.jpg",
				alt: "A gentle ocean breeze scene",
			},
		],
	},
	{
		key: 2,
		id: "2",
		title: "Echoes of Eternity",
		author: {
			name: "Sophia Lane",
			id: "auth2",
		},
		mainImage: {
			src: "/images/sample-collection-large.jpg",
			alt: "Timeless artwork capturing eternity",
		},
		sideImages: [
			{
				src: "/images/sample-image3.jpg",
				alt: "A modern city skyline at dusk",
			},
			{
				src: "/images/sample-collection-side3.jpg",
				alt: "Golden hues of an eternal sunset",
			},
			{
				src: "/images/sample-artwork1.jpg",
				alt: "Intricate patterns in an ancient artwork",
			},
		],
	},
	{
		key: 3,
		id: "3",
		title: "Mystic Dreams",
		author: {
			name: "Julian Crest",
			id: "auth3",
		},
		mainImage: {
			src: "/images/sample-image4.jpg",
			alt: "A tranquil forest shrouded in mist",
		},
		sideImages: [
			{
				src: "/images/sample-artwork3.jpg",
				alt: "An ancient city's skyline under the moon",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "Vivid reflections in a serene lake",
			},
			{
				src: "/images/sample-image2.jpg",
				alt: "A quiet winter night under the stars",
			},
		],
	},
];

export default function Home() {
	return (
		<main className="mx-auto overflow-x-hidden ">
			<NavigationBar />
			<section id="hero">
				<Hero />
			</section>

			<section id="gallery">
				<div className="container mx-auto sm:px-6 lg:px-8 pt-16 px-6 ">
					<h2 className="text-4xl font-bold mb-2">Gallery</h2>
					<p className="text-lg text-gray-600">
						Explore digital images from museums open access collections.
						Discover the world through the lens of cultural heritage.
					</p>
					<Link href="/gallery">
						<p className="inline-block underline font-medium py-2 rounded-md cursor-pointer duration-300">
							View All
						</p>
					</Link>
				</div>
				<GalleryCarousel />
			</section>
			<div className="shadow-lg rotate-180">
				<section id="singular-Image" className="shadow-lg rotate-180" >
					{/* <ArtworkDisplay /> */}
				</section>
			</div>
			<section id="collection-Section " className="shadow-lg">
				<div className="container mx-auto  px-6 pt-16 ">
					<div className="mb-8 text-left ">
						<h2 className="text-4xl font-bold mb-2">Curated Collections</h2>
						<p className="text-lg text-gray-600">
							Our editorial team and collaborators curate collections from the
							archive to unearth and highlight connections between cultural
							objects across institutions.
						</p>
						<Link href={"/collections"}>
							<p className="inline-block underline font-medium py-2 rounded-md cursor-pointer transition-colors duration-300">
								View All
							</p>
						</Link>
					</div>
				<CollectionSection collections={collections} />
				</div>
			</section>
			<section id="footer">
				<Footer />
			</section>
		</main>
	);
}
