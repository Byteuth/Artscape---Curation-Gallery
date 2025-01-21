"use server";

import { Artwork, HarvardArtwork, MetArtwork, Image } from "@/types";

export async function getArtworkByIdAndSource(
	id = "",
	source = ""
): Promise<Artwork | null> {
	try {
		const rawData = await fetchRawArtworkData(id, source);
		if (!rawData) return null;

		return source === "H"
			? mapHarvardToArtwork(rawData)
			: mapMetToArtwork(rawData);
	} catch (error) {
		console.error("Error in getArtworkByIdAndSource:", error);
		throw error;
	}
}

function mapHarvardToArtwork(harvardData: HarvardArtwork): Artwork {
	return {
		id: harvardData.id,
		title: harvardData.title || "",
		dated: harvardData.dated || "",
		images: harvardData.images.map((image: Image) => image.baseimageurl),
		source: "Harvard",
		description: harvardData.description || null,
		medium: harvardData.medium || null,
		dimensions: harvardData.dimensions || null,

		colors: harvardData.colors || [],
		technique: harvardData.technique || null,
		period: harvardData.period || null,
		classification: harvardData.classification || null,
		artist: harvardData.people?.[0]?.name || null,
		artistNationality: harvardData.people?.[0]?.culture || null,
		objectURL: harvardData.url,

		country: harvardData.culture,
		department: harvardData.department,
		creditLine: harvardData.creditline,

		objectDate: harvardData.dated,
		objectID: harvardData.id,

		url: harvardData.url,
	};
}

function mapMetToArtwork(metData: MetArtwork): Artwork {
	return {
		id: metData.objectID,
		title: metData.title || "",
		dated: metData.objectDate || "",
		images: metData.primaryImage
			? [metData.primaryImage, ...(metData.additionalImages || [])]
			: metData.additionalImages || [],
		source: "Met",
		description: metData.description || null,
		medium: metData.medium || null,
		dimensions: metData.dimensions || null,

		technique: metData.technique || null,
		period: metData.period || null,
		classification: metData.classification || null,
		artist: metData.artistDisplayName || null,
		artistNationality: metData.artistNationality || null,
		objectURL: metData.objectURL,

		country: metData.country,
		department: metData.department,
		creditLine: metData.creditLine,

		objectDate: metData.objectDate,
		objectID: metData.objectID,

		url: metData.objectURL,
	};
}

async function fetchRawArtworkData(id: string, source: string): Promise<any> {
	if (source === "H") {
		const apiKey = process.env.HARVARD_API_KEY;
		if (!apiKey) {
			throw new Error(
				"Harvard API key is missing. Please check your environment configuration."
			);
		}

		const searchUrl = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=100&id=${encodeURIComponent(
			id
		)}`;

		const response = await fetch(searchUrl);
		if (!response.ok) {
			throw new Error(
				`Error fetching artwork from Harvard: ${response.statusText}`
			);
		}

		const data = await response.json();
		return data.records?.[0] || null;
	} else if (source === "M") {
		const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${encodeURIComponent(
			id
		)}`;

		const response = await fetch(searchUrl);
		if (!response.ok) {
			throw new Error(
				`Error fetching artwork from Met: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data || null;
	} else {
		throw new Error(
			"Invalid source specified. Source must be 'H' for Harvard or 'M' for Met."
		);
	}
}
