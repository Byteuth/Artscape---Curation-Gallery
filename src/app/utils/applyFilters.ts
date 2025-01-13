interface Artwork {
	copyright?: object;
	contextualtextcount?: number;
	creditline?: string;
	accesslevel?: number;
	dateoflastpageview?: string;
	classificationid?: number;
	division?: string;
	markscount?: number;
	publicationcount?: number;
	totaluniquepageviews?: number;
	contact?: string;
	colorcount?: number;
	rank?: number;
	id?: number;
	state?: object;
	verificationleveldescription?: string;
	period?: object;
	images?: object;
	worktypes?: object;
	imagecount?: number;
	totalpageviews?: number;
	accessionyear?: number;
	standardreferencenumber?: object;
	signed?: object;
	classification?: string;
	relatedcount?: number;
	verificationlevel?: number;
	primaryimageurl?: string;
	titlescount?: number;
	peoplecount?: number;
	style?: object;
	lastupdate?: string;
	commentary?: object;
	periodid?: object;
	technique?: string;
	edition?: object;
	description?: string;
	medium?: string;
	lendingpermissionlevel?: number;
	title?: string;
	accessionmethod?: string;
	colors?: object;
	provenance?: string;
	groupcount?: number;
	dated?: string;
	department?: string;
	dateend?: number;
	people?: object;
	url?: string;
	dateoffirstpageview?: string;
	century?: string;
	objectnumber?: string;
	labeltext?: object;
	datebegin?: number;
	culture?: string;
	exhibitioncount?: number;
	imagepermissionlevel?: number;
	mediacount?: number;
	objectid?: number;
	techniqueid?: number;
	dimensions?: string;
	seeAlso?: object;
}
interface SearchObject {
	keywords: string[];
	hasImage: boolean;
	searchKey: string;
}

export function applyFilters(
	artworks: Artwork[],
	searchObject: SearchObject
): Artwork[] {
	const { keywords, hasImage } = searchObject;

	return artworks.filter((artwork) => {
		// Ensure `artwork.images` exists and is non-empty if `hasImage` is true
		
		const response = !hasImage ? artwork.images?.length > 0 : true;

		// console.log(`Artwork ID: ${artwork.id}, hasImages: ${hasImages}`);
		return response;
	});
}
