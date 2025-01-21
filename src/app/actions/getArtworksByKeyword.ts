"use server";

export async function getArtworksByKeyword(
	searchKey: string,
	page: number = 1,
	itemsPerPage: number = 10 
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

		// Ensure objectIDs is valid
		if (!metData || !metData.objectIDs || !Array.isArray(metData.objectIDs)) {
			console.warn(
				"No objectIDs found for the Met API response. Returning empty results."
			);
			return {
				harvardResponse: {
					data: harvardData.records || [],
					total: harvardData.info.totalrecords || 0,
				},
				metResponse: {
					data: [],
					total: metData.total || 0,
				},
			};
		}

		const startIndex = (page - 1) * itemsPerPage;
		const objectIDsBatch = metData.objectIDs.slice(
			startIndex,
			startIndex + itemsPerPage
		);

		// Fetch details for each object ID
		const metArtworks = await Promise.all(
			objectIDsBatch.map(async (id: number) => {
				try {
					const metDetailUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
					const detailResponse = await fetch(metDetailUrl);
					if (!detailResponse.ok) return null;
					return await detailResponse.json();
				} catch (error) {
					console.error(`Error fetching details for object ID ${id}:`, error);
					return null;
				}
			})
		);

		return {
			harvardResponse: {
				data: harvardData.records || [],
				total: harvardData.info.totalrecords || 0,
			},
			metResponse: {
				data: metArtworks.filter(Boolean), 
				total: metData.total || 0,
			},
		};
	} catch (error) {
		console.error("Error fetching artworks:", error);
		throw error;
	}
}
