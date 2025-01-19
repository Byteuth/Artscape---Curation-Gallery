"use server";

export async function getArtworksByKeyword(
	searchKey: string,
	page: number = 1,
	itemsPerPage: number = 25
) {
	const apiKey = process.env.HARVARD_API_KEY;

	if (!apiKey) {
		throw new Error(
			"Harvard API key is missing. Please check your environment configuration."
		);
	}

	try {
		// Harvard API (page-based pagination)
		const harvardUrl = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=${itemsPerPage}&q=${encodeURIComponent(
			searchKey
		)}&imagepermissionlevel=0&page=${page}`;
		const harvardResponse = await fetch(harvardUrl);
		const harvardData = await harvardResponse.json();

		// Met API (slice batches of itemsPerPage object IDs per "page")
		const metUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(
			searchKey
		)}`;
		const metResponse = await fetch(metUrl);
		const metData = await metResponse.json();

		// Slice based on the current "page"
		const startIndex = (page - 1) * itemsPerPage;
		const objectIDsBatch = metData.objectIDs.slice(
			startIndex,
			startIndex + itemsPerPage
		);

		const metArtworks = await Promise.all(
			objectIDsBatch.map(async (id: number) => {
				const metDetailUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
				const detailResponse = await fetch(metDetailUrl);
				if (!detailResponse.ok) return null;
				return await detailResponse.json();
			})
		);

		return {
			harvardResponse: {
				data: harvardData.records,
				total: harvardData.info.totalrecords,
			},
			metResponse: {
				data: metArtworks.filter(Boolean),
				total: metData.total,
			},
		};
	} catch (error) {
		console.error("Error fetching artworks:", error);
		throw error;
	}
}
