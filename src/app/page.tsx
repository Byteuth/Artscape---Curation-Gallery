import Link from "next/link";

import NavigationBar from "@/components/navigation-bar";
import Hero from "@/components/hero";
import GalleryCarousel from "@/components/gallery-carousel";
import ArtworkDisplay from "@/components/artwork-display";
import CollectionSection from "@/components/collection-section";
import Footer from "@/components/footer";

export default function Home() {
	return (
		<main className="">
			<NavigationBar />
			<section id="hero">
				<Hero />
			</section>
			<section id="gallery">
				<div className="container mx-auto sm:px-6 lg:px-8 pt-16 px-12 ">
					<h2 className="text-4xl font-bold mb-2">Gallery</h2>
					<p className="text-lg text-gray-600">
						Explore digital images from museums open access collections.
					</p>
					<Link href="/gallery">
						<p className="inline-block underline font-medium py-2 rounded-md cursor-pointer duration-300">
							View All
						</p>
					</Link>
				</div>
				<GalleryCarousel />
			</section>
			<section id="singular-Image">
				<ArtworkDisplay />
			</section>
			<section id="collection-Section">
				<CollectionSection />
			</section>
			<section id="footer">
				<Footer />
			</section>
		</main>
	);
}
