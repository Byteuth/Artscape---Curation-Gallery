"use server";

import { ArtworksResponse } from "@/types/index";

export async function getArtworksByKeyword(
	searchKey: string
): Promise<ArtworksResponse> {
	try {
		const apiKey = process.env.HARVARD_API_KEY;
		const searchUrl = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=100&q=${encodeURIComponent(
			searchKey
		)}&imagepermissionlevel=0`;

		const response = await fetch(searchUrl);
		if (!response.ok) {
			throw new Error(`Error fetching artworks: ${response.statusText}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error fetching artworks:", error);
		throw error;
	}
}
