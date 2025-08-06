/**
 * TS types for Fursona Schema v1.3 (as of commit cd76477, from 2025-02-11)
 * https://github.com/pyrox0/fursona-schema/
 */

export interface FursonaSchema {
	sonas: Sona[];
}

export interface Sona {
	name: string;
	species: string;
	description: string;
	pronouns?: string;
	gender?: string;
	avatar?: string;
	avatarAlt?: string;
	avatarAttribution?: string;
	ref?: string;
	refAlt?: string;
	refAttribution?: string;
	age?: number;
	birthdate?: string;
	colors?: string[];
	gallery?: GalleryItem[];

	sexuality?: string; // Not officially in the schema, but used by furrcard.com.
}

export interface GalleryItem {
	image: string;
	imageAlt?: string;
	imageAttribution?: string;
	description?: string;
}