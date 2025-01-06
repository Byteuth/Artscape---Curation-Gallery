import Image from "next/image";
import Link from "next/link";

interface ArtworkImage {
	src: string;
	alt: string;
}

interface CuratedCollectionProps {
	id: string;
	title: string;
	author: {
		name: string;
		id: string;
	};
	mainImage: ArtworkImage;
	sideImages: ArtworkImage[];
}

export default function CollectionSection() {
	return (
		<div className="bg-[#ffffff] flex flex-col justify-center items-center p-16 w-full ">
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
						<CollectionGrid
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
		</div>
	);
}

export function CollectionGrid({
	id,
	title,
	author,
	mainImage,
	sideImages,
}: CuratedCollectionProps) {
	return (
		<div className="relative w-full min-w-[300px] max-w-[450px]">
			<div className="relative min-w-[300px] max-w-[450px]">
				<Link href={`/curated-collections/${id}`}>
					<div className="grid grid-cols-4 gap-2 w-full h-[300px] mb-4">
						<div className="relative col-span-3">
							<Image
								src={mainImage.src}
								alt={mainImage.alt}
								layout="fill"
								objectFit="cover"
								objectPosition="top"
								className="rounded-lg"
							/>
						</div>
						<div className="flex flex-col gap-2">
							{sideImages.map((image, index) => (
								<div
									key={index}
									className="relative rounded-lg h-full object-cover overflow-hidden"
								>
									<Image
										src={image.src}
										alt={image.alt}
										layout="fill"
										objectFit="cover"
										sizes="10vw"
									/>
									{index === sideImages.length - 1 && (
										<div className="relative bg-gray-900/70 w-full h-full">
											<div className="absolute bottom-1/4 left-1/4 font-surrealism flex items-center text-xl text-white gap-2">
												{sideImages.length}
												<svg
													role="presentation"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M18.7071 11.2929L12.7071 5.29285L11.2929 6.70707L15.5857 11H5V13H15.5857L11.2929 17.2929L12.7071 18.7071L18.7071 12.7071L19.4142 12L18.7071 11.2929Z"
														fill="white"
													/>
												</svg>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
					<div className="max-w-[300px]">
						<p className="font-surrealism text-md mb-2 text-gray-900 !leading-[120%]">
							<span>{title}</span>
						</p>
						<div className="font-rococo text-sm text-gray-600 opacity-0">
							<span>By {author.name}</span>
						</div>
					</div>
				</Link>
				<div className="absolute max-w-[300px] bottom-0 font-rococo text-sm text-gray-600 pointer-events-none">
					<span>
						By{" "}
						<Link
							href={`/profile/${author.id}`}
							className="pointer-events-auto hover:text-gray-300"
						>
							{author.name}
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}
