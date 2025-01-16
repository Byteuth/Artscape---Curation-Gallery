"use server";

import { ArtworksResponse } from "@/types/index";

export async function getArtworksByKeyword(
	searchKey: string
): Promise<{
	metResponse: {
		data: any[];
		total: number;
	};
	harvardResponse: {
		data: ArtworksResponse["records"];
		total: number;
	};
}> {
	try {
		const apiKey = process.env.HARVARD_API_KEY;

		// Harvard API
		const harvardUrl = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=100&q=${encodeURIComponent(
			searchKey
		)}&imagepermissionlevel=0`;

		const harvardResponse = await fetch(harvardUrl);
		if (!harvardResponse.ok) {
			throw new Error(
				`Error fetching Harvard artworks: ${harvardResponse.statusText}`
			);
		}
		const harvardData = await harvardResponse.json();

		// Met API
		const metUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(
			searchKey
		)}`;

		const metResponse = await fetch(metUrl);
		if (!metResponse.ok) {
			throw new Error(`Error fetching Met artworks: ${metResponse.statusText}`);
		}
		const metData = await metResponse.json();

		// Fetch Met artwork details
		const metArtworks = await Promise.all(
			metData.objectIDs.slice(0, 100).map(async (id: number) => {
				const metDetailUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
				const detailResponse = await fetch(metDetailUrl);
				if (!detailResponse.ok) return null;
				return await detailResponse.json();
			})
		);


		return {
			harvardResponse: {
				data: harvardData.records,
				total: harvardData.info.totalrecords, // Total count from Harvard API
			},
			metResponse: {
				data: metArtworks.filter(Boolean), // Filter nulls if any details failed to fetch
				total: metData.total, // Total count from Met API
			},
		};
	} catch (error) {
		console.error("Error fetching artworks:", error);
		throw error;
	}
}
