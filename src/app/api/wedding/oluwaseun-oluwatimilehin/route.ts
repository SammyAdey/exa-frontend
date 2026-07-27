import { NextRequest, NextResponse } from "next/server";

type WeddingRsvpBody = {
	firstName?: string;
	lastName?: string;
	email?: string;
	phoneCountryCode?: string;
	phoneNumber?: string;
	attendance?: "confirmed" | "declined";
	accommodation?: "yes" | "no";
};

function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: NextRequest) {
	const webhookUrl = process.env.WEDDING_JUSTUS2_SHEETS_WEBHOOK_URL?.trim();
	if (!webhookUrl) {
		return NextResponse.json(
			{
				message:
					"RSVP sheet is not configured yet. Set WEDDING_JUSTUS2_SHEETS_WEBHOOK_URL on the frontend.",
			},
			{ status: 503 },
		);
	}

	let body: WeddingRsvpBody;
	try {
		body = (await request.json()) as WeddingRsvpBody;
	} catch {
		return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
	}

	const { firstName, lastName, email, phoneCountryCode, phoneNumber, attendance, accommodation } = body;

	if (
		!isNonEmptyString(firstName) ||
		!isNonEmptyString(lastName) ||
		!isNonEmptyString(email) ||
		!isNonEmptyString(phoneNumber) ||
		(attendance !== "confirmed" && attendance !== "declined") ||
		(accommodation !== "yes" && accommodation !== "no")
	) {
		return NextResponse.json({ message: "Missing required RSVP fields." }, { status: 400 });
	}

	const row = {
		timestamp: new Date().toISOString(),
		firstName: firstName.trim(),
		lastName: lastName.trim(),
		email: email.trim().toLowerCase(),
		phoneCountryCode: String(phoneCountryCode || "").trim(),
		phoneNumber: phoneNumber.trim(),
		attendance: attendance === "confirmed" ? "Yes" : "No",
		accommodation: accommodation === "yes" ? "Yes" : "No",
		event: "Oluwaseun & Oluwatimilehin",
		source: "wedding/oluwaseun-oluwatimilehin",
	};

	try {
		const response = await fetch(webhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(row),
			redirect: "follow",
		});

		// Apps Script often returns 302 then 200 HTML; treat non-5xx as success if fetch completed.
		if (!response.ok && response.status >= 500) {
			const text = await response.text().catch(() => "");
			console.error("[justus2-rsvp] Sheets webhook failed:", response.status, text.slice(0, 500));
			return NextResponse.json({ message: "Unable to save RSVP to the sheet." }, { status: 502 });
		}

		return NextResponse.json({ message: "RSVP saved." });
	} catch (error) {
		console.error("[justus2-rsvp] Sheets webhook error:", error);
		return NextResponse.json({ message: "Unable to save RSVP to the sheet." }, { status: 502 });
	}
}
