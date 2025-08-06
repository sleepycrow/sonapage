import type { FursonaSchema } from "@/interfaces/FursonaSchema";

const URI_HOST_REGEX = /^(?:https?:\/\/)?((?:[\p{L}0-9-]{2,})(?:\.[\p{L}0-9-]{2,})+)/ui;

export function extractHost(uri: string): string | null {
	const matches = URI_HOST_REGEX.exec(uri.trim() || '');
	return (matches && matches?.length > 1)
		? matches[1]
		: null;
}

function getFursonaInfoUrls(host: string): string[] {
	const proxyUrlPattern: string = import.meta.env.VITE_PROXY_URL;
	if (proxyUrlPattern) {
		const proxyUrl = proxyUrlPattern.replace('{host}', host);
		return [ proxyUrl ];
	}

	if (import.meta.env.DEV) {
		console.warn("No proxy URL set, falling back to dev-only client-side fetching! Behavior might not be consistent with prod!");
		return [
			`https://${host}/.well-known/fursona`,
			`https://${host}/.well-known/fursona.json`,
			`http://${host}/.well-known/fursona`,
			`http://${host}/.well-known/fursona.json`,
		];
	}

	return [];
}

export async function loadFursonaInfo(host: string): Promise<FursonaSchema> {
	const urls = getFursonaInfoUrls(host);
	for (let url of urls) {
		const resp = await fetch(url);
		if (resp.ok) {
			return await resp.json();
		} else if (resp.status === 404) {
			continue;
		} else {
			let body;
			try {
				body = await resp.text();
			} catch (_e) {}

			throw new Error(`${resp.status} - ${resp.statusText}` + (body ? ` (${body})` : ''));
		}
	}

	throw new Error('404 - Not Found');
}