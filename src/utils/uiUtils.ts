const HEX_REGEX = /(?:^|#)([0-9a-f]{6}|[0-9a-f]{3})/i;

export function isHexColorDark(hexString: string) {
	const safeHex = HEX_REGEX.exec(hexString)?.[1];

	let r, g, b;
	if (safeHex?.length === 6) {
		r = Number('0x' + safeHex.substring(0, 2));
		g = Number('0x' + safeHex.substring(2, 4));
		b = Number('0x' + safeHex.substring(4, 6));
	} else if (safeHex?.length === 3) {
		const rLetter = safeHex.substring(0, 1);
		const gLetter = safeHex.substring(1, 2);
		const bLetter = safeHex.substring(2, 3);

		r = Number('0x' + rLetter + rLetter);
		g = Number('0x' + gLetter + gLetter);
		b = Number('0x' + bLetter + bLetter);
	} else {
		return false;
	}

	// HSP (Hue, Saturation, Perceived brightness) equation from http://alienryderflex.com/hsp.html
	const hsp = Math.sqrt(
		0.299 * (r * r) +
		0.587 * (g * g) +
		0.114 * (b * b)
	);

	return hsp < 127.5;
}