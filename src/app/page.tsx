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

const dummyArtwork = {
	id: 304551,
	title: "Seated Cat on Inscribed Base",
	dated: "mid 7th-late 1st century BCE",
	images: [
		"https://nrs.harvard.edu/urn-3:HUAM:LEG251667_dynmc",
		"https://nrs.harvard.edu/urn-3:HUAM:LEG257059",
		"https://nrs.harvard.edu/urn-3:HUAM:LEG257060",
		"https://nrs.harvard.edu/urn-3:HUAM:LEG257061",
		"https://nrs.harvard.edu/urn-3:HUAM:LEG257062",
		"https://nrs.harvard.edu/urn-3:HUAM:LEG257063",
		"https://nrs.harvard.edu/urn-3:HUAM:LEG257064",
		"https://nrs.harvard.edu/urn-3:HUAM:LEG257065",
		"https://nrs.harvard.edu/urn-3:HUAM:LEG257066",
		"https://nrs.harvard.edu/urn-3:HUAM:STR017578",
		"https://nrs.harvard.edu/urn-3:HUAM:STR017579",
		"https://nrs.harvard.edu/urn-3:HUAM:STR017580",
		"https://nrs.harvard.edu/urn-3:HUAM:STR017581",
		"https://nrs.harvard.edu/urn-3:HUAM:LEG5693_dynmc",
	],
	source: "Harvard",
	description: null,
	medium: "Mixed copper alloy",
	dimensions: "9.9 x 3.8 x 7.9 cm (3 7/8 x 1 1/2 x 3 1/8 in.)",
	colors: [
		{
			color: "#fafafa",
			spectrum: "#955ba5",
			hue: "White",
			percent: 0.3332867132867133,
			css3: "#fffafa",
		},
		{
			color: "#e1e1e1",
			spectrum: "#955ba5",
			hue: "Grey",
			percent: 0.2774825174825175,
			css3: "#dcdcdc",
		},
		{
			color: "#c8c8c8",
			spectrum: "#8c5fa8",
			hue: "Grey",
			percent: 0.1647086247086247,
			css3: "#c0c0c0",
		},
		{
			color: "#4b4b4b",
			spectrum: "#3db657",
			hue: "Grey",
			percent: 0.07319347319347319,
			css3: "#2f4f4f",
		},
		{
			color: "#323232",
			spectrum: "#2eb45d",
			hue: "Grey",
			percent: 0.058414918414918415,
			css3: "#2f4f4f",
		},
		{
			color: "#646464",
			spectrum: "#7866ad",
			hue: "Grey",
			percent: 0.04303030303030303,
			css3: "#696969",
		},
		{
			color: "#191919",
			spectrum: "#1eb264",
			hue: "Grey",
			percent: 0.026153846153846153,
			css3: "#000000",
		},
		{
			color: "#7d7d7d",
			spectrum: "#8362aa",
			hue: "Grey",
			percent: 0.015337995337995338,
			css3: "#808080",
		},
		{
			color: "#969696",
			spectrum: "#8761aa",
			hue: "Grey",
			percent: 0.007505827505827506,
			css3: "#a9a9a9",
		},
		{
			color: "#000000",
			spectrum: "#1eb264",
			hue: "Black",
			percent: 0.0006526806526806527,
			css3: "#000000",
		},
	],
	technique: "Cast, lost-wax process",
	period: "Late Period to Ptolemaic",
	classification: "Sculpture",
	artist: null,
	artistNationality: null,
	objectURL: "https://www.harvardartmuseums.org/collections/object/304551",
	country: "Egyptian",
	department: "Department of Ancient and Byzantine Art & Numismatics",
	creditLine:
		"Harvard Art Museums/Arthur M. Sackler Museum, Gift of Louise M. and George E. Bates",
	objectDate: "mid 7th-late 1st century BCE",
	objectID: 304551,
	url: "https://www.harvardartmuseums.org/collections/object/304551",
};
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
				<section id="singular-Image" className="shadow-lg rotate-180">
					<ArtworkDisplay artwork={dummyArtwork} loading={false} />
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
