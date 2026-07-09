const DEFAULT_BACKGROUND = "#0B0B0C";
const DEFAULT_ACCENT_RGB = "158, 0, 255";

export type EventPageTheme = {
	background: string;
	accentRgb: string;
};

export const DEFAULT_EVENT_PAGE_THEME: EventPageTheme = {
	background: DEFAULT_BACKGROUND,
	accentRgb: DEFAULT_ACCENT_RGB,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const rgbToCss = (r: number, g: number, b: number) => `rgb(${r}, ${g}, ${b})`;

const darken = (r: number, g: number, b: number, factor = 0.42) =>
	rgbToCss(
		Math.round(r * factor),
		Math.round(g * factor),
		Math.round(b * factor),
	);

export const extractImageAccentColor = (imageUrl: string): Promise<EventPageTheme | null> =>
	new Promise((resolve) => {
		const image = new Image();
		image.crossOrigin = "anonymous";
		image.decoding = "async";

		image.onload = () => {
			try {
				const canvas = document.createElement("canvas");
				const sampleSize = 72;
				canvas.width = sampleSize;
				canvas.height = sampleSize;
				const context = canvas.getContext("2d");
				if (!context) {
					resolve(null);
					return;
				}

				context.drawImage(image, 0, 0, sampleSize, sampleSize);
				const { data } = context.getImageData(0, 0, sampleSize, sampleSize);

				let redTotal = 0;
				let greenTotal = 0;
				let blueTotal = 0;
				let count = 0;

				for (let index = 0; index < data.length; index += 4) {
					const alpha = data[index + 3];
					if (alpha < 128) {
						continue;
					}

					const red = data[index];
					const green = data[index + 1];
					const blue = data[index + 2];
					const brightness = (red + green + blue) / 3;

					if (brightness > 245) {
						continue;
					}

					redTotal += red;
					greenTotal += green;
					blueTotal += blue;
					count += 1;
				}

				if (!count) {
					resolve(null);
					return;
				}

				const red = Math.round(redTotal / count);
				const green = Math.round(greenTotal / count);
				const blue = Math.round(blueTotal / count);

				resolve({
					background: darken(red, green, blue),
					accentRgb: `${clamp(red, 0, 255)}, ${clamp(green, 0, 255)}, ${clamp(blue, 0, 255)}`,
				});
			} catch {
				resolve(null);
			}
		};

		image.onerror = () => resolve(null);
		image.src = imageUrl;
	});
