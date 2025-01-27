import { create } from "zustand";

interface Artwork {
	id: number;
	title: string;
	dated: string;
	images: string[];
	source: string;
}

interface ArtworkStore {
	artworks: Artwork[];
	setStoresArtworks: (newArtworks: Artwork[]) => void;
}

// Create Zustand store
export const useArtworkStore = create<ArtworkStore>((set) => ({
	artworks: [],
	setStoresArtworks: (newArtworks: Artwork[]) => set({ artworks: newArtworks }),
}));
