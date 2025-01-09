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

interface FilterProps {
	filterWords: string[];
	setFilterWords: React.Dispatch<React.SetStateAction<string[]>>;
	addFilter: (word: string) => void;
	filterOptions: {
		Material: { label: string; value: string }[];
		Classification: { label: string; value: string }[];
		Technique: { label: string; value: string }[];
	};
}
{
	/* Handles the filter button functionality */
}
export function Filter({
	filterWords, // Selected filter words
	addFilter, // Function to add a filter word to prev list
	filterOptions, //  Array of filter options
}: FilterProps) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = React.useState<
		"Technique" | "Classification" | "Material"
	>("Classification");

	const categoryKeys = Object.keys(filterOptions) as Array<
		"Technique" | "Classification" | "Material"
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
			<PopoverContent className="w-auto p-0 translate-x-14">
				<Command>
					<div className="flex gap-2 p-2 border-b">
						{categoryKeys.map((category) => (
							<Button
								key={category}
								variant={selectedCategory === category ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedCategory(category)}
							>
								{category}
							</Button>
						))}
					</div>

					{selectedCategory === "Classification" && (
						<CommandInput
							placeholder={`Search ${selectedCategory.toLowerCase()}`}
							className="h-9"
						/>
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
	length: number;
	setSearchObject: React.Dispatch<React.SetStateAction<SearchObject>>;
	filteredArtworks: any[];
}

{
	/*Main search component, handles adding and removing of filters */
}
export default function SearchAndFilter({
	visibleArtworksAmount, // Number of visible artworks
	length, // Total number of artworks
	setSearchObject, // Function to set the search object
	filteredArtworks, // Array of filtered artworks
}: searchAndFilterProps) {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const [filterWords, setFilterWords] = useState<string[]>([]);
	const [mustHaveImage, setMustHaveImage] = useState<boolean>(true);
	const pathName = usePathname();
	const isGalleryPage = pathName === "/gallery";

	const filterOptions: Record<
		"Technique" | "Classification" | "Material",
		{ label: string; value: string }[]
	> = {
		Classification: Array.from(
			new Set(
				filteredArtworks
					.map((artwork) => artwork.classification)
					.filter(Boolean)
			)
		).map((item) => ({
			label: `${item} (${
				filteredArtworks.filter((artwork) => artwork.classification === item)
					.length
			})`,
			value: item,
		})),
		Technique: Array.from(
			new Set(
				filteredArtworks.map((artwork) => artwork.technique).filter(Boolean)
			)
		).map((item) => ({
			label: item,
			value: item,
		})),
		Material: Array.from(
			new Set(filteredArtworks.map((artwork) => artwork.medium).filter(Boolean))
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
	};

	useEffect(() => {
		setSearchObject({
			keywords: filterWords,
			hasImage: mustHaveImage,
			searchKey: searchTerm,
		});
	}, [filterWords, mustHaveImage, setSearchObject]);

	return (
		<>
			<h3 className="text-3xl font-bold">Search</h3>
			<p className="text-gray-600 mb-4"> Explore digital images from museums&lsquo; open access collections.</p>
			<div className="flex items-center space-x-2 mb-4">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSearch();
					}}
					className="flex items-center w-full space-x-2"
				>
					<Input
						type="search"
						placeholder="Search for public domain artworks and artifacts"
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
				<div className="flex items-center space-x-2 mb-4 mt-1">
					{filterWords.map((word) => (
						<div
							key={word}
							className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center"
						>
							{word}
							<Button
								variant="ghost"
								size="sm"
								className="ml-1 h-4 w-4 p-0"
								onClick={() => removeFilterWord(word)}
							>
								<span className="sr-only">Remove</span>
								&times;
							</Button>
						</div>
					))}
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
						onClick={() => setMustHaveImage(!mustHaveImage)}
						className={`${mustHaveImage ? "border-black" : "border-none"}`}
					>
						{" "}
						Must Have Image
						{mustHaveImage ? <SquareCheckBig /> : <Square />}
					</Button>
				</div>
			)}

			{visibleArtworksAmount > 0 && (
				<p className="text-sm text-gray-600 my-6">
					{Math.min(visibleArtworksAmount, length)} of {length} Works
				</p>
			)}
		</>
	);
}
