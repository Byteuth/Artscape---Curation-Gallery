"use client";

import React, { useState, useEffect } from "react";
import { Plus, Check, Square, SquareCheckBig } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import type { Artwork } from "@/types";
import { Card } from "./ui/card";

interface FilterProps {
	filterWords: string[];
	setFilterWords: React.Dispatch<React.SetStateAction<string[]>>;
	addFilter: (word: string) => void;
	filterOptions: {
		Material: { label: string; value: string }[];
		Classification: { label: string; value: string }[];
		Source: { label: string; value: string }[];
	};
}
{
	/* Handles the filter button functionality */
}
export function Filter({
	filterWords, // Selected filter words
	addFilter, // Function to add a filter word to prev list
	filterOptions, //  Array of filter options
	setFilterWords, // Function to set the filter words
}: FilterProps) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = React.useState<
		"Classification" | "Material" | "Source"
	>("Classification");

	const categoryKeys = Object.keys(filterOptions) as Array<
		"Classification" | "Material" | "Source"
	>;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={` w-auto justify-between ${
						filterWords.length > 0 ? "border-black" : "border-none"
					}`}
					size="sm"
				>
					<Plus className="h-4 w-4 mr-1" />
					Add filter
				</Button>
			</PopoverTrigger>
			<PopoverContent className="md:w-auto p-0 translate-x-6 w-70">
				<Command>
					<div className="flex gap-2 p-2 border-b">
						{categoryKeys.map((category) => (
							<Button
								key={category}
								variant={selectedCategory === category ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedCategory(category)}
							>
								{category === "Classification" ? "Medium" : category}
							</Button>
						))}
						<Button
							className="ml-auto border-dashed border-black"
							variant="outline"
							size="sm"
							onClick={() => {
								setOpen(false);
								setFilterWords([]);
							}}
						>
							Clear All
						</Button>
					</div>

					{selectedCategory === "Classification" && (
						<CommandInput placeholder={`Search Medium...`} className="h-9" />
					)}
					<CommandList>
						<CommandEmpty>No filters found.</CommandEmpty>
						<CommandGroup>
							{filterOptions[selectedCategory].map((filter) => (
								<CommandItem
									key={filter.value}
									value={filter.value}
									onSelect={(currentValue) => {
										setOpen(false);
										addFilter(currentValue);
									}}
								>
									{filter.label}
									<Check
										className={cn(
											"ml-auto",
											filterWords.includes(filter.value)
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

interface SearchObject {
	keywords: string[];
	hasImage: boolean;
	searchKey: string;
}
interface searchAndFilterProps {
	visibleArtworksAmount: number;
	totalArtworks: number;
	setSearchObject: React.Dispatch<React.SetStateAction<SearchObject>>;
	artworks: Artwork[];
	handleImageFilterChange: (value: boolean) => void;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

{
	/*Main search component, handles adding and removing of filters */
}
export default function SearchAndFilter({
	visibleArtworksAmount, // Number of visible artworks
	totalArtworks, // Total number of artworks
	setSearchObject, // Function to set the search object
	artworks, // Array of artworks
	handleImageFilterChange,
	setLoading,
}: searchAndFilterProps) {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterWords, setFilterWords] = useState<string[]>([]);
	const [mustHaveImage, setMustHaveImage] = useState<boolean>(false);
	const pathName = usePathname();
	const isGalleryPage = pathName === "/gallery";
	//const router = useRouter() //Removed as per update

	const filterOptions = {
		Classification: Array.from(
			new Set(
				artworks
					.map((artwork) => artwork.classification)
					.filter((item): item is string => Boolean(item))
			)
		).map((item) => ({
			label: `${item} (${
				artworks.filter((artwork) => artwork.classification === item).length
			})`,
			value: item,
		})),

		Material: Array.from(
			new Set(
				artworks
					.map((artwork) => artwork.medium)
					.filter((item): item is string => Boolean(item))
			)
		).map((item) => ({
			label: item,
			value: item,
		})),

		Source: Array.from(
			new Set(
				artworks
					.map((artwork) => artwork.source)
					.filter((item): item is string => Boolean(item))
			)
		).map((item) => ({
			label: item,
			value: item,
		})),
	};

	const removeFilterWord = (word: string) => {
		setFilterWords((prev) => prev.filter((w) => w !== word));
	};

	const addFilter = (word: string) => {
		if (word && !filterWords.includes(word)) {
			setFilterWords((prev) => [...prev, word]);
		}
	};

	const handleSearch = () => {
		setSearchObject({
			keywords: filterWords,
			hasImage: mustHaveImage,
			searchKey: searchTerm,
		});
		localStorage.setItem("lastSearchTerm", searchTerm);
	};
	const handleMustHaveImage = () => {
		setMustHaveImage(!mustHaveImage);
		handleImageFilterChange(mustHaveImage);
		// setLoading(false);
	};
	useEffect(() => {
		const lastSearchTerm = localStorage.getItem("lastSearchTerm");
		if (lastSearchTerm) {
			setSearchTerm(lastSearchTerm);
		}
	}, []);

	useEffect(() => {
		setSearchObject((prev) => ({
			...prev,
			keywords: filterWords,
			hasImage: mustHaveImage,
		}));
	}, [filterWords, mustHaveImage, setSearchObject]);

	useEffect(() => {
		return () => {
			localStorage.setItem("lastSearchTerm", searchTerm);
		};
	}, [searchTerm]);

	return (
		<Card className="bg-green-300 w-full pt-16 pb-8 px-2 ">
			<div>
				<div className="container mx-auto px-6">
					<h3 className="text-3xl font-bold">Search</h3>
					<p className="text-gray-600 mb-4">
						Explore digital images from museums&lsquo; open access collections.
					</p>
					<div className="flex items-center space-x-2 ">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleSearch();
							}}
							className="flex items-center w-full space-x-2"
						>
							<Input
								type="search"
								placeholder="Search for artworks"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full bg-white"
							/>
							<Button type="submit" size="sm">
								Search
							</Button>
						</form>
					</div>

					{/* Visible Selected Filters */}
					{visibleArtworksAmount > 0 && isGalleryPage && (
						<>
							<div className="flex flex-wrap items-center gap-2 mb-2 mt-2">
								{/* Add Filters */}
								<Filter
									filterWords={filterWords}
									setFilterWords={setFilterWords}
									addFilter={addFilter}
									filterOptions={filterOptions}
								/>

								<Button
									variant="outline"
									size="sm"
									onClick={handleMustHaveImage}
									className={`flex items-center gap-1 ${
										mustHaveImage ? "border-black" : "border-none"
									}`}
								>
									Must Have Image
									{mustHaveImage ? <SquareCheckBig /> : <Square />}
								</Button>
							</div>
							<div className="flex flex-wrap items-center space-x-2 mb-2 mt-4 ">
								{filterWords.map((word) => (
									<div
										key={word}
										className="bg-gray-100 border-dashed border border-gray-500 text-gray-800 text-sm font-medium px-2.5 py-1 mb-2 rounded-full flex items-center"
									>
										{word}
										<Button
											variant="ghost"
											size="sm"
											className="ml-2 h-4 w-4 p-0"
											onClick={() => removeFilterWord(word)}
										>
											<span className="sr-only">Remove</span>
											&times;
										</Button>
									</div>
								))}
							</div>
						</>
					)}
					{/* {totalArtworks > visibleArtworksAmount && isGalleryPage && (
						<div className="flex flex-wrap items-center space-x-2 mb-2 mt-4">
							<p className="text-sm font-medium text-gray-600">
								{totalArtworks} Artworks
							</p>
						</div>
					)} */}
				</div>
			</div>
		</Card>
	);
}
