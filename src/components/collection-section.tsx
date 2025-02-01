"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Collections } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "./loading-spinner";
import { Plus, Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { toast, useToast } from "@/hooks/use-toast";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CollectionSection() {
	const path = usePathname();
	const [visibleArtworks, setVisibleArtworks] = useState<number>(
		path === "/" ? 8 : 8
	);
	const [collections, setCollections] = useState<Collections[]>([]);
	const [userNames, setUserNames] = useState<Record<string, string>>({});
	const [currentUserId, setCurrentUserId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");

	const fetchCurrentUser = useCallback(async () => {
		try {
			const response = await fetch("/api/auth/session");
			const data = await response.json();
			setCurrentUserId(data.user?.id || null);
		} catch (error) {
			console.error("Failed to fetch current user:", error);
		}
	}, []);

	const fetchUserName = useCallback(async (userId: string) => {
		try {
			const response = await fetch(`/api/user/${userId}`);
			const data = await response.json();
			return data.name;
		} catch (error) {
			console.error(`Failed to fetch user info for ${userId}:`, error);
			return null;
		}
	}, []);

	const fetchCollectionsAndUsers = async () => {
		setIsLoading(true);
		await fetchCurrentUser();

		try {
			const response = await fetch("/api/collections");
			const collectionsData: Collections[] = await response.json();

			let filteredCollections = collectionsData;

			if (currentUserId) {
				filteredCollections = collectionsData.filter(
					(collection) => collection.userId === currentUserId
				);
			} else {
				filteredCollections = [];
			}

			const uniqueUserIds = [
				...new Set(filteredCollections.map((collection) => collection.userId)),
			];

			const userNamesMap: Record<string, string> = {};
			const userNamePromises = uniqueUserIds.map(async (userId) => {
				const name = await fetchUserName(userId);
				if (name) {
					userNamesMap[userId] = name;
				}
			});

			await Promise.all(userNamePromises);
			setCollections(filteredCollections);
			setUserNames(userNamesMap);
		} catch (error) {
			console.error("Failed to fetch collections:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCreateNewCollection = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!title || !description) {
			setError("Title and description are required");
			return;
		}

		setIsLoading(true);

		try {
			const createResponse = await fetch("/api/collections", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, description, userId: currentUserId }),
			});

			if (!createResponse.ok) {
				const errorData = await createResponse.json();
				setError(errorData.error || "An unexpected error occurred");
				return;
			}

			// Fetch only the user's collections after creating a new one
			await fetchCollectionsAndUsers();
			setShowCreateForm(false);
			setDescription("");
			setTitle("");
			toast({
				title: "Collection Created",
				description: `${title} was created successfully.`,
			});
		} catch (error) {
			console.error("Error during collection creation:", error);
			setError("An error occurred during collection creation.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCollectionsAndUsers();
	}, [path, currentUserId, fetchCurrentUser, fetchUserName]);

	const loadMore = () => {
		setVisibleArtworks((prev) => prev + 12);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="flex flex-col pb-6 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
			{!collections || (collections.length === 0 && !isLoading) ? (
				<div className="text-center">
					<p className="text-lg text-gray-600">
						{path === "/saved"
							? "You've got no saved collections at this time."
							: "There are no collections available."}
					</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
						{collections.slice(0, visibleArtworks).map((collection) => {
							const reversed = collection.artworks
								.map((artwork) => {
									if (!artwork || !artwork.images) return null;

									const images = Array.isArray(artwork.images)
										? artwork.images.filter(Boolean)
										: [artwork.images];

									return images[0] || null;
								})
								.filter((image): image is string => image !== null)
								.reverse();

							return (
								<>
									<CollectionGrid
										key={collection.id}
										id={collection.id}
										title={collection.title}
										images={reversed}
										user={userNames[collection.userId] || "Unknown User"}
										collections={collections}
										setCollections={setCollections}
										path={path}
									/>
								</>
							);
						})}
						{path === "/saved" && (
							<Card
								className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
								onClick={() => setShowCreateForm(true)}
							>
								<CardContent className="flex flex-col items-center justify-center h-full p-6">
									<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<Plus className="w-8 h-8 text-primary" />
									</div>
									<p className="font-semibold text-center">
										Create New Collection
									</p>
								</CardContent>
							</Card>
						)}

						<Dialog
							open={showCreateForm}
							onOpenChange={() => setShowCreateForm(false)}
						>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Create New Collection</DialogTitle>
								</DialogHeader>
								<form
									onSubmit={handleCreateNewCollection}
									className="space-y-4"
								>
									{error && <p className="text-red-500 text-sm">{error}</p>}
									<div className="space-y-2">
										<label htmlFor="title" className="text-sm font-medium">
											Title
										</label>
										<Input
											id="title"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											placeholder="Enter collection title"
										/>
									</div>
									<div className="space-y-2">
										<label
											htmlFor="description"
											className="text-sm font-medium"
										>
											Description
										</label>
										<Textarea
											id="description"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											placeholder="Enter collection description"
											rows={3}
										/>
									</div>
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? "Creating..." : "Create Collection"}
									</Button>
								</form>
							</DialogContent>
						</Dialog>
					</div>

					{visibleArtworks < collections.length && path !== "/" && (
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
				</>
			)}
		</div>
	);
}

export function CollectionGrid({
	id,
	title,
	user,
	images,
	collections,
	setCollections,
	path,
}: {
	id: string;
	title: string;
	user: string;
	images: string[];
	collections: Collections[];
	setCollections: React.Dispatch<React.SetStateAction<Collections[]>>;
	path: string;
}) {
	// const fixedImages = collections.arworks
	const imageArray = images ? images : [];

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const [deleteConfirmation, setDeleteConfirmation] = useState<{
		isOpen: boolean;
		collectionId: string | null;
	}>({
		isOpen: false,
		collectionId: null,
	});
	const handleDeleteCollection = async (collectionId: string) => {
		setLoading(true);
		setError("");

		try {
			const response = await fetch(`/api/collections/${collectionId}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				toast({
					title: "Collection Deleted",
					description: `Collection has been successfully deleted.`,
				});

				const updatedCollections = collections.filter(
					(collection) => collection.id !== collectionId
				);
				setCollections(updatedCollections);
			} else {
				const errorData = await response.json();
				setError(errorData.error || "Failed to delete the collection.");
			}
		} catch (error) {
			console.error("Error deleting collection:", error);
			setError("An unexpected error occurred.");
		} finally {
			setLoading(false);
			setDeleteConfirmation({ isOpen: false, collectionId: null });
		}
	};

	return (
		<Card
			className={`group cursor-pointer overflow-hidden transform transition-transform hover:shadow-right-bottom md:hover:scale-105 z-10`}
		>
			{path === "/saved" && (
				<Button
					onClick={(e) => {
						e.stopPropagation();
						setDeleteConfirmation({
							isOpen: true,
							collectionId: id,
						});
					}}
					aria-label="Delete Collection"
					className="absolute top-2 right-2 scale-x-110  p-2 rounded-full shadow-md hover:bg-red-600 z-10 duration-300 bg-white"
				>
					<Trash2 className="text-black hover:text-white transition-colors duration-300 z-40" />
				</Button>
			)}
			<Dialog
				open={deleteConfirmation.isOpen}
				onOpenChange={(isOpen) =>
					setDeleteConfirmation({ isOpen, collectionId: null })
				}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Deletion</DialogTitle>
						<DialogDescription>
							{`Are you sure you want to delete "${title}" collection? This
				action cannot be undone.`}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="sm:justify-start">
						<Button
							type="button"
							variant="destructive"
							onClick={() => {
								if (deleteConfirmation.collectionId) {
									handleDeleteCollection(deleteConfirmation.collectionId);
								}
							}}
							disabled={loading}
						>
							{loading ? "Deleting..." : "Delete"}
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() =>
								setDeleteConfirmation({
									isOpen: false,
									collectionId: null,
								})
							}
						>
							Cancel
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Link href={`/collections/${id}`} className="block">
				<div className="relative aspect-square overflow-hidden">
					{imageArray.length === 0 ? (
						// No images - show full placeholder
						<Image
							src="/images/placeholder-image.png"
							alt={`${title} placeholder`}
							fill
							className="object-cover"
						/>
					) : imageArray.length === 1 ? (
						// Single image layout
						<Image
							src={imageArray[0] || "/placeholder.svg"}
							alt={`${title} main image`}
							fill
							className="object-cover"
						/>
					) : (
						// Multiple images layout
						<div className="grid grid-cols-2 gap-1 h-full">
							<div className="relative col-span-1 row-span-2">
								<Image
									src={imageArray[0] || "/placeholder.svg"}
									alt={`${title} main image`}
									fill
									className="object-cover"
								/>
							</div>
							{imageArray.length > 1 && (
								<>
									{[...Array(2)].map((_, index) => (
										<div key={index} className="relative">
											{index < imageArray.length - 1 ? (
												<Image
													src={imageArray[index + 1] || "/placeholder.svg"}
													alt={`${title} image ${index + 2}`}
													fill
													className="object-cover"
												/>
											) : (
												<div className="absolute inset-0 bg-black bg-opacity-70" />
											)}
											{index === 1 && imageArray.length > 3 && (
												<div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
													<span className="text-white text-lg font-semibold">
														+{imageArray.length - 3} more
													</span>
												</div>
											)}
										</div>
									))}
								</>
							)}
						</div>
					)}
				</div>
			</Link>

			<div className="p-4 bg-gradient-to-b from-gray-100 to-white">
				<h3 className="font-surrealism text-lg font-semibold text-gray-900 mb-1 leading-tight truncate">
					{title}
				</h3>
				<p className="font-rococo text-sm text-gray-600">
					By <span className="text-primary ">{user}</span>
				</p>
			</div>
		</Card>
	);
}
