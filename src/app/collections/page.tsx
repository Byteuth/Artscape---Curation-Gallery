"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import CollectionSection from "@/components/collection-section";
import NavigationBar from "@/components/navigation-bar";
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
	{
		key: 4,
		id: "4",
		title: "Serenity Now",
		author: {
			name: "Isabella Frost",
			id: "auth4",
		},
		mainImage: {
			src: "/images/sample-image5.jpg",
			alt: "A peaceful ocean scene at dawn",
		},
		sideImages: [
			{
				src: "/images/sample-artwork4.jpg",
				alt: "A delicate balance of light and shadow",
			},
			{
				src: "/images/sample-collection-side2.jpg",
				alt: "Calm waters reflecting a golden sky",
			},
			{
				src: "/images/sample-image1.jpg",
				alt: "A lone tree on a misty hill",
			},
		],
	},
	{
		key: 5,
		id: "5",
		title: "Shadows and Light",
		author: {
			name: "Marcus Hale",
			id: "auth5",
		},
		mainImage: {
			src: "/images/sample-collection-side3.jpg",
			alt: "A dramatic play of shadows and light",
		},
		sideImages: [
			{
				src: "/images/sample-collection-large.jpg",
				alt: "Golden rays illuminating a forest path",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A bustling cityscape under twilight",
			},
			{
				src: "/images/sample-artwork1.jpg",
				alt: "Artistic patterns in vivid tones",
			},
		],
	},
	{
		key: 6,
		id: "6",
		title: "Golden Serenity",
		author: {
			name: "Elara Moon",
			id: "auth6",
		},
		mainImage: {
			src: "/images/sample-image2.jpg",
			alt: "A golden sunset over tranquil waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Abstract golden waves on canvas",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A mystical bridge under the stars",
			},
			{
				src: "/images/sample-artwork4.jpg",
				alt: "A reflective lake at sunrise",
			},
		],
	},
	{
		key: 7,
		id: "7",
		title: "Luminous Skies",
		author: {
			name: "Derek Stone",
			id: "auth7",
		},
		mainImage: {
			src: "/images/sample-artwork3.jpg",
			alt: "The sky illuminated with vibrant hues",
		},
		sideImages: [
			{
				src: "/images/sample-image4.jpg",
				alt: "Golden fields basking in sunlight",
			},
			{
				src: "/images/sample-collection-side3.jpg",
				alt: "A tranquil pathway into the forest",
			},
			{
				src: "/images/sample-image1.jpg",
				alt: "A serene nightfall by the lake",
			},
		],
	},
	{
		key: 8,
		id: "8",
		title: "Ethereal Glow",
		author: {
			name: "Nina Starling",
			id: "auth8",
		},
		mainImage: {
			src: "/images/sample-collection-large.jpg",
			alt: "A soft ethereal glow over the horizon",
		},
		sideImages: [
			{
				src: "/images/sample-image5.jpg",
				alt: "A gentle breeze under the twilight",
			},
			{
				src: "/images/sample-artwork1.jpg",
				alt: "Ancient markings on weathered stone",
			},
			{
				src: "/images/sample-collection-side2.jpg",
				alt: "Golden leaves scattered in the wind",
			},
		],
	},
	{
		key: 9,
		id: "9",
		title: "Azure Reflections",
		author: {
			name: "Leo Rivers",
			id: "auth9",
		},
		mainImage: {
			src: "/images/sample-image3.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork4.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image2.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 10,
		id: "10",
		title: "SunsetEdge",
		author: {
			name: "Barry Smith",
			id: "auth10",
		},
		mainImage: {
			src: "/images/sample-image3.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork4.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image2.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 11,
		id: "11",
		title: "Red Butter",
		author: {
			name: "Steve",
			id: "auth11",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image2.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 12,
		id: "12",
		title: "Reflections Green",
		author: {
			name: "John Doe",
			id: "auth12",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 13,
		id: "13",
		title: "Crimson Dusk",
		author: {
			name: "Amara Flint",
			id: "auth13",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 14,
		id: "14",
		title: "Oceanic Drift",
		author: {
			name: "Kai Wave",
			id: "auth14",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 15,
		id: "15",
		title: "Twilight Serenade",
		author: {
			name: "Lyra Night",
			id: "auth15",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 16,
		id: "16",
		title: "Golden Mirage",
		author: {
			name: "Elena Ray",
			id: "auth16",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 17,
		id: "17",
		title: "Aurora Dreams",
		author: {
			name: "Finn Snow",
			id: "auth17",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 18,
		id: "18",
		title: "Whispers of Rain",
		author: {
			name: "Maya Raine",
			id: "auth18",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 19,
		id: "19",
		title: "Celestial Harmony",
		author: {
			name: "Stella Sky",
			id: "auth19",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 20,
		id: "20",
		title: "Verdant Pathways",
		author: {
			name: "Lily Green",
			id: "auth20",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 21,
		id: "21",
		title: "Silent Peaks",
		author: {
			name: "Orion Vale",
			id: "auth21",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 22,
		id: "22",
		title: "Velvet Night",
		author: {
			name: "Selene Ray",
			id: "auth22",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 23,
		id: "23",
		title: "Amber Twilight",
		author: {
			name: "Clara Ember",
			id: "auth23",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 24,
		id: "24",
		title: "Frozen Echoes",
		author: {
			name: "Aria Frost",
			id: "auth24",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 25,
		id: "25",
		title: "Whims of the Wind",
		author: {
			name: "Zephyr Gale",
			id: "auth25",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 26,
		id: "26",
		title: "Dusklight Serenade",
		author: {
			name: "Lyra Solis",
			id: "auth26",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 27,
		id: "27",
		title: "Hidden Valleys",
		author: {
			name: "Elias Fern",
			id: "auth27",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
	{
		key: 28,
		id: "28",
		title: "Celestial Dreams",
		author: {
			name: "Nova Starling",
			id: "auth28",
		},
		mainImage: {
			src: "/images/sample-image1.jpg",
			alt: "A vast azure sky reflected in still waters",
		},
		sideImages: [
			{
				src: "/images/sample-artwork2.jpg",
				alt: "Delicate watercolor brush strokes",
			},
			{
				src: "/images/sample-image3.jpg",
				alt: "A frozen pathway glistening in sunlight",
			},
			{
				src: "/images/sample-collection-side1.jpg",
				alt: "A winding path through a golden field",
			},
		],
	},
];

export default function Collections() {
	return (
		<div className="mx-auto overflow-x-hidden">
			<NavigationBar />
			<Link href="/">
				<Button variant="ghost" className="md:m-4 m-2">
					<ArrowLeft className=" h-4 w-4" />
					Home
				</Button>
			</Link>
			<div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] items-center bg-gradient-to-r from-white to-[#ebefe0] drop-shadow-lg text-center py-6 lg:p-12 ">
				<div>
					<h1 className="lg:text-8xl text-4xl font-bold mb-8 px-4 lg:text-left text-center text-black">
						Curated Collections
					</h1>
				</div>
				<p className="text-gray-600 text-left px-4">
					Our editorial team and collaborators curate collections from the
					archive to unearth and highlight connections between cultural objects
					across institutions.
				</p>
			</div>

			<CollectionSection />
			<Footer />
		</div>
	);
}
