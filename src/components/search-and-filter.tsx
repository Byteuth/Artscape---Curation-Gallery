"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface searchAndFilterProps {
	visibleArtworks: number;
	setVisibleArtworks: React.Dispatch<React.SetStateAction<number>>;
	length: number;
}

export default function SearchAndFilter({
	visibleArtworks,
	length, 
}: searchAndFilterProps) {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterWords, setFilterWords] = useState<string[]>([]);
	const pathName = usePathname();
	const isGalleryPage = pathName === "/";

	const addFilter = (word: string) => {
		if (word && !filterWords.includes(word)) {
			setFilterWords((prev) => [...prev, word]);
		}
	};

	const removeFilterWord = (word: string) => {
		setFilterWords((prev) => prev.filter((w) => w !== word));
	};
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
					<Button variant="outline" size="sm" onClick={() => addFilter("dogs")}>
						<Plus className="h-4 w-4 mr-1" />
						Add Filter
					</Button>
				</div>
			)}
			{visibleArtworks > 0 && (
				<p className="text-sm text-gray-600 my-6">
					{Math.min(visibleArtworks, length)} of {length}{" "}
					Works
				</p>
			)}
		</>
	);
}
