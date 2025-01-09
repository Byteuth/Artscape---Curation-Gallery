'use server';

export async function getArtworks(query: string = "") {
	try {
        const apiKey = process.env.HARVARD_API_KEY
		const searchUrl = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=100&q=${encodeURIComponent(
			query
		)}&hasimage=1&imagepermissionlevel=0`;

		const response = await fetch(searchUrl);
		if (!response.ok) {
			throw new Error(`Error fetching artworks: ${response.statusText}`);
		}

		const data = await response.json();

		console.log("🖼️ Fetched Artworks Data:", JSON.stringify(data, null, 2));
		// const artworks = data.records.map((artwork: any) => ({
		// 	id: artwork.id,
		// 	title: artwork.title || "Unknown Title",
		// 	image: artwork.primaryimageurl || "/images/artwork-frame-placeholder.jpg",
		// 	date: artwork.dated || "Unknown Date",
		// }));

		return data.records;
	} catch (error) {
		console.error("Error fetching artworks:", error);
		return [];
	}

}
