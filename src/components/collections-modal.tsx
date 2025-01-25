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
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import type { Artwork, Collections } from "@/types";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";

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
			
			if (response.ok) {
				const data = await response.json();
				if (data.message === "Artwork is already in the collection") {
					toast({
						title: "Failed to add",
						description: `Artwork already exists in the collection.`,
					});
				} else {
					toast({
						title: "Successfully added to collection",
						description: `Artwork was successfully added to the collection.`,
					});
				}
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
		}
	};


	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">
						Your Collections
					</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
					{collections.map((collection: Collection) => {
						const images = collection.images?.split(",").filter(Boolean) || [];

						return (
							<Card
								key={collection.id}
								className="group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
								onClick={() => handleAddToCollection(collection.id)}
							>
								<CardContent className="p-3">
									<div className="aspect-square overflow-hidden rounded-md">
										<div
											className={`grid gap-1 h-full ${
												images.length === 1
													? "grid-cols-1 grid-rows-1"
													: "grid-cols-2 grid-rows-2"
											}`}
										>
											<div
												className={`relative ${
													images.length === 1
														? "col-span-1 row-span-1"
														: "col-span-1 row-span-2"
												}`}
											>
												<Image
													src={
														images[0]?.trim() || "/images/placeholder-image.png"
													}
													alt={`${collection.title} main image`}
													className="rounded-md object-cover w-full h-full"
													width={300}
													height={300}
												/>
											</div>
											{images.length > 1 && (
												<>
													<div className="relative col-span-1 row-span-1">
														<Image
															src={images[1]?.trim() || "/placeholder.svg"}
															alt={`${collection.title} image 2`}
															className="rounded-md object-cover w-full h-full"
															width={300}
															height={300}
														/>
													</div>
													<div className="relative col-span-1 row-span-1">
														<Image
															src={
																images[2]?.trim() ||
																"/images/placeholder-image.png"
															}
															alt={`${collection.title} image 3`}
															className="rounded-md object-cover w-full h-full"
															width={300}
															height={300}
														/>
														{images.length > 3 && (
															<div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-md">
																<p className="text-white font-semibold">
																	+{images.length - 3}
																</p>
															</div>
														)}
													</div>
												</>
											)}
										</div>
									</div>
								</CardContent>

								<CardFooter className="flex flex-col items-center justify-center p-3 bg-gradient-to-b from-transparent to-gray-100">
									<p className="font-semibold text-center mb-2">
										{collection.title}
									</p>
									<div className="flex items-center gap-2 w-full justify-between">
										<Button variant="outline" size="sm" className="w-1/2">
											Add
										</Button>
										<Button
											onClick={(e) => {
												e.stopPropagation();
												handleDeleteCollection(collection.id);
											}}
											className="p-3 bg-gray-500 text-white rounded-full shadow hover:bg-red-600 transition"
											aria-label="Delete Collection"
										>
											<Trash className="w-4 h-4" />
										</Button>
									</div>
								</CardFooter>
							</Card>
						);
					})}

					<Card
						className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
						onClick={() => setShowCreateForm(true)}
					>
						<CardContent className="flex flex-col items-center justify-center h-full p-6">
							<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
								<Plus className="w-8 h-8 text-primary" />
							</div>
							<p className="font-semibold text-center">Create New Collection</p>
						</CardContent>
					</Card>
				</div>

				<Dialog
					open={showCreateForm}
					onOpenChange={() => setShowCreateForm(false)}
				>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Create New Collection</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleCreateNewCollection} className="space-y-4">
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
								<label htmlFor="description" className="text-sm font-medium">
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
							<Button type="submit" className="w-full" disabled={loading}>
								{loading ? "Creating..." : "Create Collection"}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</DialogContent>
		</Dialog>
	);
}
