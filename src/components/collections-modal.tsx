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
import type { Collections } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface CollectionsModalProps {
	isOpen: boolean;
	onClose: () => void;
	collections: Collections[];
	setCollections: React.Dispatch<React.SetStateAction<Collections[]>>;
}

export default function CollectionsModal({
	isOpen,
	onClose,
	collections,
	setCollections,
}: CollectionsModalProps) {
	const [showCreateForm, setShowCreateForm] = React.useState(false);
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const { data: session } = useSession();

	function getFirstImage(images: string): string {
		if (!images) return "/images/placeholder-image.png";
		const imageArray = images.split(",");
		return imageArray[0] || "/images/placeholder-image.png";
	}

	function getArtworksCount(images: string): string | number {
		if (!images || images.trim() === "") {
			return "Empty";
		}

		const length = images.split(",").filter(Boolean).length;
		return length;
	}

	function handleAddToCollection(collectionId: string) {
		console.log("Add to collection:", collectionId);
	}

	const handleSubmit = async (e: React.FormEvent) => {
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
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[80vw] max-h-[60vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Your Collections</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					{collections.map((collection) => (
						<Card
							key={collection.id}
							className="overflow-hidden transform transition-all hover:scale-105 hover:border-2 hover:border-gray-300"
						>
							<CardContent className="p-0">
								<div className="relative w-full h-48">
									<Image
										src={getFirstImage(collection.images) || "/placeholder.svg"}
										alt={collection.title}
										layout="fill"
									/>
								</div>
							</CardContent>
							<CardFooter className="flex flex-col p-4">
								<div>
									<div className="flex justify-between items-center">
										<h3 className="font-semibold">
											{collection.title}{" "}
											<span className="text-sm text-gray-500">
												({getArtworksCount(collection.images)})
											</span>
										</h3>
									</div>
									<p
										className="text-sm text-gray-500 mt-1 line-clamp-1"
										style={{
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{collection.description}
									</p>
								</div>
								<Button
									className="mt-8 text-white rounded"
									variant={"default"}
									onClick={handleAddToCollection}
								>
									Add to Collection
								</Button>
							</CardFooter>
						</Card>
					))}

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
							<p className=" rounded">Create new collection</p>
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
							<form onSubmit={handleSubmit} className="space-y-4">
								{error && <p className="text-red-500">{error}</p>}

								<div>
									<label htmlFor="title" className="block text-sm font-medium">
										Title
									</label>
									<input
										id="title"
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
