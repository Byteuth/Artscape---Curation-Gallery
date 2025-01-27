"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export interface Artwork {
	id: string;
	objectId: number;
	title: string;
	images: string | null;
	description: string | null;
	source: string;
	medium: string;
	period: string | null;
	country: string;
	department: string;
	creditLine: string;
	objectDate: string;
	objectURL: string;
	createdAt: string;
	updatedAt: string;
}

export interface User {
	id: string;
	email: string;
	password: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface Collection {
	id: string;
	userId: string;
	title: string;
	images: string | null;
	description: string;
	createdAt: string;
	updatedAt: string;
	user: User;
	artworks: Artwork[];
}

export default function CollectionSection() {
	const [visibleArtworks, setVisibleArtworks] = useState<number>(12);
	const [collections, setCollections] = useState<Collection[]>([]);
	const [userNames, setUserNames] = useState<Record<string, string>>({});

	useEffect(() => {
		const fetchUserName = async (userId: string) => {
			try {
				const response = await fetch(`/api/user/${userId}`);
				const data = await response.json();
				return data.name;
			} catch (error) {
				console.error(`Failed to fetch user info for ${userId}:`, error);
				return null;
			}
		};

		const fetchCollectionsAndUsers = async () => {
			try {
				const response = await fetch("/api/collections");
				const collectionsData: Collection[] = await response.json();
				setCollections(collectionsData);

				const uniqueUserIds = [
					...new Set(collectionsData.map((collection) => collection.userId)),
				];
				const userNamesMap: Record<string, string> = {};

				// Fetch all user names in parallel
				const userNamePromises = uniqueUserIds.map(async (userId) => {
					const name = await fetchUserName(userId);
					if (name) {
						userNamesMap[userId] = name;
					}
				});

				await Promise.all(userNamePromises);
				setUserNames(userNamesMap);
			} catch (error) {
				console.error("Failed to fetch collections:", error);
			}
		};

		fetchCollectionsAndUsers();
	}, []);

	const loadMore = () => {
		setVisibleArtworks((prev) => prev + 12);
	};

	return (
		<div className="bg-[#ffffff] flex flex-col justify-center items-center py-16 w-full">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto">
				{collections.slice(0, visibleArtworks).map((collection) => (
					<CollectionGrid
						key={collection.id}
						id={collection.id}
						title={collection.title}
						images={collection.images}
						user={userNames[collection.userId] || "Unknown User"}
					/>
				))}
			</div>
			{visibleArtworks < collections.length && visibleArtworks > 0 && (
				<div className="mt-6 text-center">
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
	images: string | null;
}) {
	const imageArray = images ? images.split(", ") : [];
	

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
			<Link href={`/collections/${id}`} className="block">
				<div className="relative aspect-square overflow-hidden">
					{imageArray.length === 1 ? (
						// Single image layout
						<Image
							src={imageArray[0] || "/images/placeholder-image.png"}
							alt={`${title} main image`}
							fill
							className="object-cover "
						/>
					) : (
						// Multiple images layout
						<div className="grid grid-cols-2 gap-1 h-full">
							<div
								className={`relative ${
									imageArray.length === 1
										? "col-span-2"
										: "col-span-1 row-span-2"
								}`}
							>
								<Image
									src={imageArray[0] || "/images/placeholder-image.png"}
									alt={`${title} main image`}
									fill
									className="object-cover "
								/>
							</div>
							{imageArray.length > 1 && (
								<>
									{imageArray.slice(1, 5).map((img, index) => (
										<div key={index} className="relative">
											<Image
												src={img || "/images/placeholder-image.png"}
												alt={`${title} image ${index + 2}`}
												fill
												className="object-cover "
											/>
											{/* Render the overlay only on the last image */}
											{index === 3 && imageArray.length > 2 && (
												<div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-md">
													<p className="text-white font-semibold text-lg">
														+{imageArray.length - 3}
													</p>
												</div>
											)}
										</div>
									))}
								</>
							)}
						</div>
					)}
				</div>

				<div className="p-4 bg-gradient-to-b from-gray-50 to-white">
					<h3 className="font-surrealism text-lg font-semibold text-gray-900 mb-1 leading-tight truncate">
						{title}
					</h3>
					<p className="font-rococo text-sm text-gray-600">
						By <span className="text-primary hover:underline">{user}</span>
					</p>
				</div>
			</Link>
		</div>
	);
}
