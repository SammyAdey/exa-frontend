export const encodePathSegment = (value: string) => encodeURIComponent(String(value ?? "").trim());

/** Decode a dynamic route param once before encoding it for API query strings. */
export const normalizeRouteParam = (value: string | string[] | undefined | null): string => {
	const raw = Array.isArray(value) ? value[0] ?? "" : String(value ?? "");
	const trimmed = raw.trim();
	if (!trimmed) {
		return "";
	}

	try {
		return decodeURIComponent(trimmed);
	} catch {
		return trimmed;
	}
};

export const buildQueryString = (params: Record<string, string | number | boolean | undefined | null>) => {
	const search = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === null) {
			return;
		}
		search.set(key, String(value));
	});
	return search.toString();
};

export const withQuery = (baseUrl: string, path: string, params: Record<string, string | number | boolean | undefined | null>) => {
	const normalizedBase = String(baseUrl ?? "").trim().replace(/\/+$/, "");
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const query = buildQueryString(params);
	return query ? `${normalizedBase}${normalizedPath}?${query}` : `${normalizedBase}${normalizedPath}`;
};
