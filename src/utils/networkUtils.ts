import type { FursonaSchema } from "@/interfaces/FursonaSchema";

const URI_HOST_REGEX = /^(?:https?:\/\/)?((?:[\p{L}0-9-]{2,})(?:\.[\p{L}0-9-]{2,})+)/ui;

export function extractHost(uri: string): string | null {
	const matches = URI_HOST_REGEX.exec(uri || '');
	return (matches && matches?.length > 1)
		? matches[1]
		: null;
}

/**
 * TODO: WRITE A SERVER-SIDE SCRIPT FOR THIS!!
 * Some sites do not allow cross-origin requests for these URLs, a server-side adapter will be needed.
 * Preferably keep this client-side implementation as well, but only for development.
 */
export async function loadFursonaInfo(host: string): Promise<FursonaSchema> {
	const urls = [
		`https://${host}/.well-known/fursona`,
		`https://${host}/.well-known/fursona.json`,
		`http://${host}/.well-known/fursona`,
		`http://${host}/.well-known/fursona.json`,
	];
	
	for (let url of urls) {
		const resp = await fetch(url);
		if (resp.ok)
			return await resp.json();
		else if (resp.status === 404)
			continue;
		else
			throw new Error(`${resp.status} - ${resp.statusText}`);
	}

	throw new Error('404 - Not Found');
}