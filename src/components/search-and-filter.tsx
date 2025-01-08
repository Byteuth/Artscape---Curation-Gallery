import React, { useState, useEffect } from "react";
import { Plus, Check } from "lucide-react";
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
	filterOptions: { label: string; value: string }[];
}

export function Filter({
	filterWords,
	addFilter,
	filterOptions,
}: FilterProps) {
	const [open, setOpen] = React.useState<boolean>(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-auto justify-between"
					size="sm"
				>
					<Plus className="h-4 w-4 mr-1" />
					Add filter
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0 translate-x-14">
				<Command>
					<CommandInput placeholder="Search all filters" className="h-9" />
					<CommandList>
						<CommandEmpty>No filters found.</CommandEmpty>
						<CommandGroup>
							{filterOptions.map((filter) => (
								<CommandItem
									key={filter.value}
									value={filter.value}
									onSelect={(currentValue) => {
										setOpen(false);
										addFilter(currentValue); // Add selected filter
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





interface searchAndFilterProps {
	visibleArtworks: number;
	length: number;
	artworks: { medium?: string }[];
}

export default function SearchAndFilter({
	visibleArtworks,
	length,
	artworks,
}: searchAndFilterProps) {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterWords, setFilterWords] = useState<string[]>([]);
	const pathName = usePathname();
	const isGalleryPage = pathName === "/gallery";

	const filterOptions = Array.from(
		new Set(
			artworks
				.map((artwork) => artwork.medium)
				.filter((medium): medium is string => Boolean(medium))
		)
	).map((medium) => ({ label: medium, value: medium }));

	const removeFilterWord = (word: string) => {
		setFilterWords((prev) => prev.filter((w) => w !== word));
	};

	const addFilter = (word: string) => {
		if (word && !filterWords.includes(word)) {
			setFilterWords((prev) => [...prev, word]);
		}
	};

	useEffect(() => {
		console.log("Selected Filter Words:", filterWords);
	}, [filterWords]);

	return (
		<>
			<h3 className="text-3xl font-bold mb-4">Search</h3>
			<div>
				<Input
					type="search"
					placeholder="Search for public domain artworks and artifacts"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full bg-white"
				/>
			</div>

			{/* Filters */}
			{visibleArtworks > 0 && isGalleryPage && (
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
				</div>
			)}

			{visibleArtworks > 0 && (
				<p className="text-sm text-gray-600 my-6">
					{Math.min(visibleArtworks, length)} of {length} Works
				</p>
			)}
		</>
	);
}
