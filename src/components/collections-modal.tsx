"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Artwork, Collections, Session } from "@/types";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

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
	const [filteredCollections, setFilteredCollections] = React.useState<
		Collections[]
	>([]);
	const [deleteConfirmation, setDeleteConfirmation] = React.useState<{
		isOpen: boolean;
		collectionId: string | null;
	}>({
		isOpen: false,
		collectionId: null,
	});

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

		setLoading(true);

		try {
			const userId = session?.user?.id;

			const createResponse = await fetch("/api/collections", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, description, userId }),
			});

			if (!createResponse.ok) {
				const errorData = await createResponse.json();
				setError(errorData.error || "An unexpected error occurred");
				return;
			}

			const createdCollection = await createResponse.json();
			const newCollectionId = createdCollection.id;

			if (artwork) {
				const addResponse = await fetch(`/api/collections/${newCollectionId}`, {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						artwork,
					}),
				});

				if (!addResponse.ok) {
					const addErrorData = await addResponse.json();
					setError(
						addErrorData.error ||
							"The collection was created, but adding the artwork failed."
					);
					return;
				}
			}

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
				toast({
					title: "Collection Created",
					description: `${title} was created successfully and artwork added.`,
				});
			} else {
				console.error("Failed to fetch updated collections");
			}
		} catch (error) {
			console.error("Error during collection creation:", error);
			setError("An error occurred during collection creation.");
		} finally {
			setLoading(false);
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
			setDeleteConfirmation({ isOpen: false, collectionId: null });
		}
	};

	useEffect(() => {
		if (session?.user?.id) {
			const collectionsByUserId = collections.filter(
				(collection) => collection.userId === session.user.id
			);

			setFilteredCollections(collectionsByUserId);
		}
	}, [collections, session?.user?.id]);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className="max-w-4xl max-h-[80vh] overflow-y-auto"
				aria-describedby={undefined}
			>
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">
						Your Collections
					</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
					{filteredCollections.map((collection) => {
						const reversed = collection.artworks.map((artwork) => {
							
							const images = artwork.images?.filter(Boolean) || [];
							return images[0];
						});

						const artworksMainImage = reversed.reverse();

						return (
							<Card
								key={collection.id}
								className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
							>
								<Button
									onClick={(e) => {
										e.stopPropagation();
										setDeleteConfirmation({
											isOpen: true,
											collectionId: collection.id,
										});
									}}
									aria-label="Delete Collection"
									className="absolute top-2 right-2 scale-x-110 opacity-0 group-hover:opacity-100 p-2 rounded-full shadow-md hover:bg-red-600 z-10 duration-300"
								>
									<Trash2 className="text-red-600 group-hover:text-white transition-colors duration-300 z-40" />
								</Button>
								<CardContent className="p-3 group">
									<div className="relative aspect-square overflow-hidden">
										{artworksMainImage.length === 1 ? (
											// Single image layout
											<Image
												src={
													artworksMainImage[0] ||
													"/images/placeholder-image.png"
												}
												alt={`${title} main image`}
												fill
												className="object-cover "
											/>
										) : (
											// Multiple images layout
											<div className="grid grid-cols-2 gap-1 h-full">
												<div
													className={`relative ${
														artworksMainImage.length === 1
															? "col-span-2"
															: "col-span-1 row-span-2"
													}`}
												>
													<Image
														src={
															artworksMainImage[0] ||
															"/images/placeholder-image.png"
														}
														alt={`${title} main image`}
														fill
														className="object-cover "
													/>
												</div>
												{artworksMainImage.length > 1 && (
													<>
														{[...Array(2)].map((_, index) => (
															<div key={index} className="relative">
																{index < artworksMainImage.length - 1 ? (
																	<Image
																		src={
																			artworksMainImage[index + 1] ||
																			"/images/placeholder-image.png"
																		}
																		alt={`${title} image ${index + 2}`}
																		fill
																		className="object-cover"
																	/>
																) : (
																	<div className="absolute inset-0 bg-black bg-opacity-70" />
																)}
																{index === 1 &&
																	artworksMainImage.length > 3 && (
																		<div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
																			<span className="text-white text-lg font-semibold">
																				+{artworksMainImage.length - 3} more
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
								</CardContent>

								<CardFooter className="flex flex-col items-center justify-center p-3 bg-gradient-to-b from-transparent to-gray-100">
									<p className="font-semibold text-center mb-2">
										{collection.title}
									</p>
									<div className="flex items-center gap-2 w-full justify-between">
										{/* <h3 className="text-gray-700">{collection.artworks.length}</h3> */}
										<p className="text-gray-700  h-[4rem] leading-tight">
											{collection.description}
										</p>
									</div>
									{artwork &&
										!collection.artworks.some((a) => a.id === artwork.id) && (
											<Button
												onClick={(e) => {
													e.stopPropagation();
													handleAddToCollection(collection.id);
												}}
												className="mt-2 w-full bg-green-400 hover:bg-green-500 text-black"
											>
												Add
											</Button>
										)}
								</CardFooter>

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
												{`Are you sure you want to delete "${collection.title}" collection? This
												  action cannot be undone.`}
											</DialogDescription>
										</DialogHeader>
										<DialogFooter className="sm:justify-start">
											<Button
												type="button"
												variant="destructive"
												onClick={() => {
													if (deleteConfirmation.collectionId) {
														handleDeleteCollection(
															deleteConfirmation.collectionId
														);
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
