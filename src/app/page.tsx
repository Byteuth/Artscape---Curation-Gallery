import Link from "next/link";

import NavigationBar from "@/components/navigation-bar";

import GalleryHero from "@/components/gallery-hero";
import ArtworkDisplay from "@/components/artwork-display";
import CollectionSection from "@/components/collection-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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

			<section id="gallery" className="relative z-0">
				<GalleryHero />
			</section>

			<section
				id="singular-Image"
				className="relative z-10 shadow-lg bg-gradient-to-b from-white via-green-100 to-green-200 overflow-hidden py-32"
			>
				<div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-6 py-12">
					{/* Left Side: Stacked Images */}
					<div className="relative w-full md:w-1/2 mb-6 md:mb-0 flex justify-center md:-translate-y-48">
						{gallerySample.map((item, index) => (
							<div
								key={item.id}
								className={`absolute w-48 h-auto shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ${
									index % 2 === 0 ? "rotate-3" : "-rotate-3"
								}`}
								style={{
									top: `${index * 30}px`,
									left: `${index * 40}px`,
									zIndex: gallerySample.length - index,
								}}
							>
								<Image
									src={item.imgUrl}
									alt={item.title}
									className="w-full h-auto object-cover"
									width={400}
									height={300}
								/>
							</div>
						))}
					</div>

					{/* Right Side: Centered Text */}
					<div className="w-full md:w-1/2 flex flex-col items-center text-center md:pl-12 mb-12 md:mb-0">
						<h3 className="text-black-400 text-4xl font-bold mb-4">
							Search for an Idea
						</h3>
						<p className="text-gray-700 mb-6">
							What do you want to see next? Think of something you’re into –
							such as <strong>Flowers</strong> or maybe <strong>Cats</strong> –
							and see what you find.
						</p>
						<Link href="/gallery">
							<Button className="bg-green-400 text-black hover:bg-green-500 scale-150 my-6">
								Explore
							</Button>
						</Link>
					</div>
				</div>
			</section>

			<section id="collection-Section">
				<div className="container mx-auto px-6 pt-16">
					<div className="w-full flex flex-col items-center text-center mb-12 md:mb-0">
						<h3 className="text-black-400 text-4xl font-bold mb-4">
							Save ideas you like
						</h3>
						<p className="text-gray-700 mb-6">
							Collect and add your favourites to collections so you can get back
							to them later.
						</p>
					</div>
				</div>
				<CollectionSection />
				<div className="w-full flex flex-col items-center text-center mb-12 ">
					<Link href="/collections">
						<Button className="bg-green-400 text-black hover:bg-green-500 scale-150 my-6">
							Explore Collections
						</Button>
					</Link>
				</div>
			</section>

			<Footer />
		</main>
	);
}
