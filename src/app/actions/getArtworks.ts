'use server';

export async function getArtworks(query: string = "") {
	try {
        const apiKey = process.env.HARVARD_API_KEY
		const searchUrl = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=100&q=${encodeURIComponent(
			query
		)}&imagepermissionlevel=0`;

		const response = await fetch(searchUrl);
		if (!response.ok) {
			throw new Error(`Error fetching artworks: ${response.statusText}`);
		}

		const data = await response.json();

		return { records: data.records, info: data.info };
	} catch (error) {
		console.error("Error fetching artworks:", error);
		return [];
	}

}
