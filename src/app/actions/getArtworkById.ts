'use server'

export async function getArtworkById(id: string = "") {
	try {
		const apiKey = process.env.HARVARD_API_KEY;
		const searchUrl = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=100&id=${encodeURIComponent(
			id
		)}`;

		const response = await fetch(searchUrl);
		if (!response.ok) {
			throw new Error(`Error fetching artworks: ${response.statusText}`);
		}

		const data = await response.json();
		console.log(data);
		return data.records;
	} catch (error) {
		console.error("Error fetching artworks:", error);
		return [];
	}
}
