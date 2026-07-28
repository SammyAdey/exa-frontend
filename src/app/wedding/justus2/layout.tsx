import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";

const display = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-wedding-display",
});

const body = Source_Sans_3({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	variable: "--font-wedding-body",
});

export const metadata: Metadata = {
	title: "Oluwaseun & Oluwatimilehin | RSVP",
	description: "Kindly respond to Oluwaseun & Oluwatimilehin's wedding invitation.",
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false,
		},
	},
	openGraph: {
		title: "Oluwaseun & Oluwatimilehin | RSVP",
		description: "Tuesday, 22 December 2026 · Victoria Island, Lagos",
		images: ["/wedding/justus2-invite.png"],
	},
};

export default function WeddingRsvpLayout({ children }: { children: React.ReactNode }) {
	return <div className={`${display.variable} ${body.variable}`}>{children}</div>;
}
