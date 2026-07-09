import type { Metadata } from "next";
import type { ReactNode } from "react";
import { resolveWhatsAppMediaUrl } from "../../../utils/whatsapp-media";

type EventPayload = {
	eventName?: string;
	eventDescription?: string;
	eventImage?: string;
};

const getSiteUrl = () =>
	String(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_FRONTEND_URL || "https://exa.theexhibit.co")
		.trim()
		.replace(/\/+$/, "");

async function fetchEvent(eventId: string): Promise<EventPayload | null> {
	const apiBase = String(process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim().replace(/\/+$/, "");
	if (!apiBase) {
		return null;
	}

	try {
		const response = await fetch(`${apiBase}/events/event?id=${encodeURIComponent(eventId)}`, {
			next: { revalidate: 300 },
		});
		if (!response.ok) {
			return null;
		}
		const payload: { data?: EventPayload } = await response.json().catch(() => ({}));
		return payload?.data ?? null;
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ eventId: string }>;
}): Promise<Metadata> {
	const { eventId } = await params;
	const event = await fetchEvent(eventId);
	const eventName = String(event?.eventName ?? "").trim() || "Event RSVP";
	const description = String(event?.eventDescription ?? `You're invited to ${eventName}. RSVP online.`).trim();
	const imageUrl = resolveWhatsAppMediaUrl(event?.eventImage);
	const pageUrl = `${getSiteUrl()}/rsvp/${eventId}`;

	return {
		title: `${eventName} | RSVP`,
		description,
		openGraph: {
			title: eventName,
			description,
			url: pageUrl,
			type: "website",
			images: [{ url: imageUrl, width: 1200, height: 630, alt: eventName }],
		},
		twitter: {
			card: "summary_large_image",
			title: eventName,
			description,
			images: [imageUrl],
		},
	};
}

export default function RsvpEventLayout({ children }: { children: ReactNode }) {
	return children;
}
