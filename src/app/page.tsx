import Link from "next/link";

import NavigationBar from "@/components/navigation-bar";

import GalleryHero from "@/components/gallery-hero";
import CollectionSection from "@/components/collection-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const gallerySample = [
	{
		title: "Figurine of a Dog",
		imgUrl: "https://nrs.harvard.edu/urn-3:HUAM:INV002119_dynmc",
		dated: "ca. 2300–2100 BCE",
		source: "M",
		id: "252349",
	},
	{
		title: "Dog",
		imgUrl: "https://images.metmuseum.org/CRDImages/es/original/DP314807.jpg",
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
		title: "Limestone dog",
		imgUrl:
			"https://images.metmuseum.org/CRDImages/dp/original/DP831743.jpg",
		dated: "ca. 1760–70",
		source: "M",
		id: "189692",
	},
];


export default function Home() {
	return (
		<main className="mx-auto overflow-x-hidden ">
			<NavigationBar />

			<section id="gallery" className="relative z-0">
				<GalleryHero />
			</section>

			<section
				id="singular-Image"
				className="relative z-10 shadow-lg bg-gradient-to-b from-white via-green-100 to-green-200 overflow-hidden py-32 mt-16"
			>
				<div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-6 py-12">
					{/* Left Side: Stacked Images */}
					<div className="relative w-full md:w-1/2 mb-6 md:mb-0 flex justify-center lg:-translate-y-48 -translate-x-6 ">
						{gallerySample.map((item, index) => (
							<div
								key={item.id}
								className={`absolute w-72 h-auto shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ${
									index % 2 === 0 ? "rotate-3" : "-rotate-3"
								}`}
								style={{
									top: `${index * 30}px`,
									left: `${index * 80}px`,
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
								Explore Gallery
							</Button>
						</Link>
					</div>
				</div>
			</section>

			<section id="collection-Section">
				<div className="container mx-auto px-6 pt-36 mb-12">
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
