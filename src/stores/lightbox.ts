import type { GalleryItem } from "@/interfaces/FursonaSchema";
import { defineStore } from "pinia";

export const useLightboxStore = defineStore('lightbox', {
	state: () => ({
		image: null as (GalleryItem | null),
	}),

	actions: {
		clearImage(): void {
			this.image = null;
		},

		setImage(image: GalleryItem): void {
			this.image = image;
		},
	},

	getters: {
		hasImage(state): boolean {
			return state.image !== null;
		},
	}
});