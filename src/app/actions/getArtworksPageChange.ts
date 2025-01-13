"use server";

import { ArtworksResponse } from "@/types/index";

export async function getArtworksPageChange(
	page: number,
	url: string
): Promise<ArtworksResponse> {
	try {
		const apiKey = process.env.HARVARD_API_KEY;
		// https://api.harvardartmuseums.org/object?apikey=3b05e9f8-9e66-4c0a-94d8-4e6aca2b20d9&size=100&q=cats&imagepermissionlevel=0&page=2
		const searchUrl = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=100&q=${encodeURIComponent(
			'cats'
		)}&imagepermissionlevel=0&page=${page}`;
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
