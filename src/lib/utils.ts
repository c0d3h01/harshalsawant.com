export const toIsoDate = (value: unknown): string => {
	const date =
		value instanceof Date
			? value
			: typeof value === "string" && value.trim()
				? new Date(value)
				: null;

	if (!date || Number.isNaN(date.getTime())) {
		throw new Error(`Invalid date: ${String(value)}`);
	}

	return date.toISOString().slice(0, 10);
};

export const formatDate = (date: string, month: "short" | "long" = "short") => {
	const parsed = new Date(date);

	if (Number.isNaN(parsed.getTime())) {
		throw new Error(`Invalid date: ${date}`);
	}

	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month,
		day: "numeric",
		timeZone: "UTC",
	}).format(parsed);
};
