const DEFAULT_WHATSAPP_IMAGE =
	"https://res.cloudinary.com/deql2elft/image/upload/f_jpg,q_auto,w_1200/v1783569983/exa-logo_omoa43.svg";

const RASTER_EXTENSIONS = /\.(jpe?g|png|webp|gif)(\?|$)/i;

export const resolveWhatsAppMediaUrl = (eventImage?: string) => {
	const trimmed = String(eventImage ?? "").trim();
	let url = trimmed || DEFAULT_WHATSAPP_IMAGE;

	if (url.startsWith("http://")) {
		url = `https://${url.slice("http://".length)}`;
	}

	if (!url.startsWith("https://")) {
		return DEFAULT_WHATSAPP_IMAGE;
	}

	if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
		const hasRasterTransform = /\/upload\/[^/]*f_(jpg|jpeg|png|webp)/i.test(url);
		const hasRasterExtension = RASTER_EXTENSIONS.test(url);
		if (!hasRasterTransform && !hasRasterExtension) {
			url = url.replace("/upload/", "/upload/f_jpg,q_auto,w_1200/");
		}
	}

	return url;
};
