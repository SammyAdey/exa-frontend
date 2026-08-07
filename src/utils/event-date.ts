/**
 * Format an event start value as a calendar date without shifting by the
 * viewer's local timezone. Uses the UTC / ISO date portion so every guest
 * sees the same day.
 */
export function formatEventCalendarDate(
	value: string | Date | null | undefined,
	locale = "en-US",
	options?: Intl.DateTimeFormatOptions,
): string {
	if (value == null || value === "") {
		return "";
	}

	const raw = typeof value === "string" ? value.trim() : "";
	const ymd = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw);

	let date: Date;
	if (ymd) {
		date = new Date(Date.UTC(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3])));
	} else {
		const parsed = value instanceof Date ? value : new Date(value);
		if (Number.isNaN(parsed.getTime())) {
			return typeof value === "string" ? value : "";
		}
		date = new Date(Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate()));
	}

	if (Number.isNaN(date.getTime())) {
		return typeof value === "string" ? value : "";
	}

	return date.toLocaleDateString(locale, {
		timeZone: "UTC",
		...options,
	});
}
