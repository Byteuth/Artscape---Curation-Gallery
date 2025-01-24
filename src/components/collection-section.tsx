"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Collections } from "@/types";

export default function CollectionSection() {
	const [visibleArtworks, setVisibleArtworks] = useState<number>(12);
	const [collections, setCollections] = useState<Collections[]>([]);

	useEffect(() => {
		const fetchCollections = async () => {
			try {
				const response = await fetch("/api/collections");
				const data = await response.json();

				// Transform the collections to parse the images into arrays
				const transformedCollections = data.map((collection: Collections) => ({
					...collection,
					images: collection.images.split(",").map((url) => url.trim()),
				}));

				setCollections(transformedCollections);
			} catch (error) {
				console.error("Failed to fetch collections:", error);
			}
		};

		fetchCollections();
	}, []);

	const loadMore = () => {
		setVisibleArtworks((prev) => prev + 12);
	};
	useEffect(() => {
		console.log(collections);
	}, [collections]);

	return (
		<div className="bg-[#ffffff] flex flex-col justify-center items-center py-16 w-full">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto">
				{collections.slice(0, visibleArtworks).map((collection, index) => (
					<CollectionGrid
						key={index}
						id={collection.id}
						title={collection.title}
						user={collection.user.name}
						images={collection.images}
						description={collection.description}
					/>
				))}
			</div>
			{visibleArtworks < collections.length && visibleArtworks > 0 && (
				<div className="mt-8 text-center">
					<p className="text-sm text-gray-600 mb-4">
						Showing {Math.min(visibleArtworks, collections.length)} of{" "}
						{collections.length}
					</p>
					<Button variant="outline" className="w-full" onClick={loadMore}>
						View More
					</Button>
				</div>
			)}
		</div>
	);
}

export function CollectionGrid({
	id,
	title,
	user,
	images,
}: {
	id: string;
	title: string;
	user: string;
	images: string;
	description: string;
}) {
	console.log(images);
	return (
		<div className="bg-[#ffffff] flex flex-col lg:p-2 py-4 px-6 w-auto ">
			<div className="relative w-full">
				<Link href={`/collection/${id}`}>
					<div className="grid grid-cols-4 gap-2 w-full h-[300px] mb-4">
						<div className="relative col-span-3">
							<Image
								src={images[0]}
								alt={`${title} main image`}
								layout="fill"
								objectPosition="top"
								className="rounded-lg object-cover"
							/>
						</div>
						<div className="flex flex-col gap-2">
							{images.slice(1).map((image, index) => (
								<div
									key={index}
									className="relative rounded-lg h-full object-cover overflow-hidden"
								>
									<Image
										src={image} 
										alt={`${title} side image ${index + 1}`}
										layout="fill"
										sizes="10vw"
										className="rounded-lg object-cover"
									/>
								</div>
							))}
						</div>
					</div>
					<div className="max-w-[300px]">
						<p className="font-surrealism text-md text-gray-900 !leading-[120%]">
							<span>{title}</span>
						</p>
						<div className="font-rococo text-sm text-gray-600">
							<span>By {user}</span>
						</div>
					</div>
				</Link>
				<div className="absolute max-w-[300px] bottom-0 font-rococo text-sm text-gray-600 pointer-events-none">
					<span>
						By{" "}
						<Link
							href={`/`}
							className="pointer-events-auto hover:text-gray-300"
						>
							{user}
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}
