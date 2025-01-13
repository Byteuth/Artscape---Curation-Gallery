import { Artwork, SearchObject } from "@/types/index";

export function applyImageToggle(
    artworks: Artwork[],
    searchObject: SearchObject
): Artwork[] {
    const { keywords, hasImage } = searchObject;

    return artworks.filter((artwork) => {
        // Ensure `artwork.images` exists and is non-empty if `hasImage` is true
        const hasImages = hasImage ? artwork.images?.length > 0 : true;

        // console.log(`Artwork ID: ${artwork.id}, hasImages: ${hasImages}`);
        // return hasImages;
        return artwork
    });
}
