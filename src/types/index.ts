interface ArtworkImage {
	src: string;
	alt: string;
}

export interface Collections {
	id: string;
	userId: string;
	title: string;
	images: string;
	mainImage: ArtworkImage;
	sideImages: ArtworkImage[];
	description: string;
	createdAt: string;
	updatedAt: string;
	artworks: Artwork[];
}

export interface Artwork {
	id: number;
	title: string;
	dated: string;
	images: string | string[]
	source: "Met" | "Harvard" | string;
	description?: string | null;
	medium?: string | null;
	dimensions?: string | null;
	provenance?: string | null;
	colors?: Color[];
	technique?: string | null;
	period?: string | null;
	classification?: string | null;
	artist?: string | null;
	artistNationality?: string | null;
	objectURL?: string;
	accessionyear?: string;
	country?: string;
	department?: string;
	creditLine?: string;
	galleryNumber?: string;
	objectDate?: string;
	objectID?: number;
	relatedTags?: string[];
	url?: string;
}

type Color = {
	r: number;
	g: number;
	b: number;
	color?: string;
	spectrum?: string;
	hue?: string;
	percent?: number;
	css3?: string;
};

interface Person {
	role: string;
	birthplace: string;
	gender: string;
	displaydate: string;
	prefix: string | null;
	culture: string;
	displayname: string;
	alphasort: string;
	name: string;
	personid: number;
	deathplace: string;
	displayorder: number;
}

interface WorkType {
	worktypeid: string;
	worktype: string;
}
export interface Image {
	alttext: string | null;
	baseimageurl: string;
	copyright: string;
	date: string;
	description: string | null;
	displayorder: number;
	format: string;
	height: number;
	idsid: number;
	iiifbaseuri: string;
	imageid: number;
	publiccaption: string | null;
	renditionnumber: string;
	technique: string | null;
	width: number;
}

export interface HarvardArtwork {
	copyright: string;
	contextualtextcount: number;
	creditline: string;
	accesslevel: number;
	dateoflastpageview: string;
	classificationid: number;
	division: string;
	markscount: number;
	publicationcount: number;
	totaluniquepageviews: number;
	contact: string;
	colorcount: number;
	rank: number;
	id: number;
	state: string | null;
	verificationleveldescription: string;
	period: string | null;
	images: Image[];
	worktypes: WorkType[];
	imagecount: number;
	totalpageviews: number;
	accessionyear: number;
	standardreferencenumber: string;
	signed: string;
	classification: string;
	relatedcount: number;
	verificationlevel: number;
	primaryimageurl: string | null;
	titlescount: number;
	peoplecount: number;
	style: string | null;
	lastupdate: string;
	commentary: string | null;
	periodid: string | null;
	technique: string;
	edition: string | null;
	description: string | null;
	medium: string | null;
	lendingpermissionlevel: number;
	title: string;
	accessionmethod: string;
	colors: Color[];
	provenance: string;
	groupcount: number;
	dated: string;
	department: string;
	dateend: number;
	people: Person[];
	url: string;
	dateoffirstpageview: string;
	century: string;
	objectnumber: string;
	labeltext: string | null;
	datebegin: number;
	culture: string;
	exhibitioncount: number;
	imagepermissionlevel: number;
	mediacount: number;
	objectid: number;
	techniqueid: number;
	dimensions: string;
	seeAlso: { id: string; type: string; format: string; profile: string }[];
}

interface Tag {
	term: string;
	AAT_URL: string;
	Wikidata_URL: string;
}

export interface MetArtwork {
	objectID: number;
	isHighlight: boolean;
	accessionNumber: string;
	accessionYear: string;
	isPublicDomain: boolean;
	primaryImage: string;
	primaryImageSmall: string;
	additionalImages: string[];
	constituents: any;
	department: string;
	objectName: string;
	title: string;
	culture: string;
	period: string;
	dynasty: string;
	reign: string;
	portfolio: string;
	artistRole: string;
	artistPrefix: string;
	artistDisplayName: string;
	artistDisplayBio: string;
	artistSuffix: string;
	artistAlphaSort: string;
	artistNationality: string;
	artistBeginDate: string;
	artistEndDate: string;
	artistGender: string;
	artistWikidata_URL: string;
	artistULAN_URL: string;
	objectDate: string;
	objectBeginDate: number;
	objectEndDate: number;
	medium: string;
	dimensions: string;
	measurements: any; // Can be replaced with a specific type if known
	creditLine: string;
	geographyType: string;
	city: string;
	state: string;
	county: string;
	country: string;
	region: string;
	subregion: string;
	locale: string;
	locus: string;
	excavation: string;
	river: string;
	classification: string;
	rightsAndReproduction: string;
	linkResource: string;
	metadataDate: string;
	repository: string;
	objectURL: string;
	tags: Tag[];
	objectWikidata_URL: string;
	isTimelineWork: boolean;
	GalleryNumber: string;
	technique: string;
	description: string;
}

export interface SearchObject {
	keywords: string[];
	hasImage: boolean;
	searchKey: string;
}

export interface ArtworksResponse {
	records: Artwork[];
	info: {
		next: string;
		page: number;
		pages: number;
		totalrecords: number;
		totalrecordsperquery: number;
	};
}

export interface Session {
	user: {
		id: string;
		email?: string | null;
		image?: string | null;
		name?: string | null;
	};
}

export interface User {
	id: string;
	email: string;
	password: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}
