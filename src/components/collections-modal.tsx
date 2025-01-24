"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Artwork, Collections } from "@/types";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface CollectionsModalProps {
	isOpen: boolean;
	onClose: () => void;
	collections: Collections[];
	setCollections: React.Dispatch<React.SetStateAction<Collections[]>>;
	artwork: Artwork;
}

export default function CollectionsModal({
	isOpen,
	onClose,
	collections,
	setCollections,
	artwork,
}: CollectionsModalProps) {
	const [showCreateForm, setShowCreateForm] = React.useState(false);
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const { data: session } = useSession();
	const { toast } = useToast();



	const handleAddToCollection = async (collectionId: string) => {
		setLoading(true);
		setError("");

		try {
			const response = await fetch(`/api/collections/${collectionId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					artwork: artwork,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				setError(errorData.error || "Failed to add artwork to collection");
			}
		} catch (error) {
			console.error("Error adding artwork to collection:", error);
			setError("An unexpected error occurred.");
		} finally {
			const response = await fetch(`/api/collections`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				const collections = await response.json();
				setCollections(collections);
				setLoading(false);
				toast({
					title: "Artwork added to collection",
					description: `Successfully added`,
				});
			}
		}
	};

	const handleCreateNewCollection = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!title || !description) {
			setError("Title and description are required");
			return;
		}

		try {
			const userId = session?.user?.id;
			const response = await fetch("/api/collections", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, description, userId }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				setError(errorData.error || "An unexpected error occurred");
			} else {
				const updatedCollectionsResponse = await fetch("/api/collections", {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});

				if (updatedCollectionsResponse.ok) {
					const updatedCollections = await updatedCollectionsResponse.json();
					setCollections(updatedCollections);
					setShowCreateForm(false);
					setDescription("");
					setTitle("");
				} else {
					console.error("Failed to fetch updated collections");
				}
			}
		} catch (error) {
			console.error("Error during collection creation:", error);
			setError("An error occurred during collection creation.");
		} finally {
			setLoading(false);
			toast({
				title: "Collection Created",
				description: `${title}  created successfully.`,
			});
		}
	};


	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[80vw] max-h-[50vh] overflow-y-auto ">
				<DialogHeader>
					<DialogTitle>Your Collections</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 ">
					{collections.map((collection) => {
						const images = collection.images.split(",").filter(Boolean);

						return (
							<Card
								key={collection.id}
								className="hover:border-2 hover:border-black relative p-1"
							>
								<CardContent className="p-0">
									<div className="grid grid-cols-4 gap-2 w-full h-[200px] mb-8 pb-2">
										{/* Main Image */}
										<div className="relative col-span-3">
											<Image
												src={images[0] || "/images/placeholder-image.png"}
												alt={`${collection.title} main image`}
												layout="fill"
												className="rounded-lg object-cover"
											/>
										</div>

										{/* Side Images */}
										<div className="flex flex-col gap-2">
											{images.slice(1).map((image, index) => (
												<div
													key={index}
													className="relative rounded-lg h-full object-cover overflow-hidden"
												>
													<Image
														src={image}
														alt={`${collection.title} side image ${index + 1}`}
														layout="fill"
														className="rounded-lg object-cover"
													/>
													{index === images.length - 2 && (
														<div className="relative bg-gray-900/70 w-full h-full">
															<div className="absolute bottom-1/4 left-1/4 flex items-center text-xl text-white gap-2">
																+{images.length - 1}
															</div>
														</div>
													)}
												</div>
											))}
										</div>
									<div className="absolute  left-1/2 transform -translate-x-1/2 bottom-1">
										<Button
											className="text-white rounded"
											variant={"default"}
											onClick={() => handleAddToCollection(collection.id)}
										>
											Add to Collection
										</Button>
									</div>
									</div>
								</CardContent>

								{/* Add to Collection Button */}
							</Card>
						);
					})}

					<Card
						className="overflow-hidden transform transition-all hover:scale-105 hover:border-2 hover:border-gray-300 bg-gray-100 cursor-pointer"
						onClick={() => setShowCreateForm(true)}
					>
						<CardContent className="p-0">
							<div className="relative w-full h-48">
								<Plus className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150" />
							</div>
						</CardContent>
						<CardFooter className="flex flex-col p-4">
							<p className="rounded">Create new collection</p>
						</CardFooter>
					</Card>
				</div>

				{showCreateForm && (
					<Dialog
						open={showCreateForm}
						onOpenChange={() => setShowCreateForm(false)}
					>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create New Collection</DialogTitle>
							</DialogHeader>
							<form onSubmit={handleCreateNewCollection} className="space-y-4">
								{error && <p className="text-red-500">{error}</p>}

								<div>
									<label htmlFor="title" className="block text-sm font-medium">
										Title
									</label>
									<input
										id="title"
										name="title"
										type="text"
										className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</div>
								<div>
									<label
										htmlFor="description"
										className="block text-sm font-medium"
									>
										Description
									</label>
									<textarea
										id="description"
										rows={3}
										className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>

								<Button
									type="submit"
									className="w-full py-2 text-white rounded mt-4"
									variant="default"
									disabled={loading}
								>
									{loading ? "Creating..." : "Create Collection"}
								</Button>
							</form>
						</DialogContent>
					</Dialog>
				)}
			</DialogContent>
		</Dialog>
	);
}
