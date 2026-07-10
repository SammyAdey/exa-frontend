"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import RsvpEventDetails from "../../../components/rsvp-event-details";
import { DEFAULT_EVENT_PAGE_THEME, extractImageAccentColor, type EventPageTheme } from "../../../utils/image-accent-color";
import { normalizeRouteParam, withQuery } from "../../../utils/url";

type EventPayload = {
	eventName?: string;
	eventId?: string;
	eventStartDate?: string;
	eventTime?: string;
	eventAddress?: string;
	eventImage?: string;
	dressCode?: string;
	description?: string;
};

type RSVPStatus = "confirmed" | "declined";

const COUNTRY_CODES = [
	{ label: "Nigeria (+234)", value: "+234" },
	{ label: "Australia (+61)", value: "+61" },
	{ label: "United States (+1)", value: "+1" },
	{ label: "United Kingdom (+44)", value: "+44" },
	{ label: "Ghana (+233)", value: "+233" },
	{ label: "Kenya (+254)", value: "+254" },
	{ label: "South Africa (+27)", value: "+27" },
] as const;

export default function RSVPPage() {
	const { eventId: eventIdParam } = useParams();
	const eventId = normalizeRouteParam(eventIdParam);
	const [event, setEvent] = useState<EventPayload | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [countryCode, setCountryCode] = useState("+234");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [extractedTheme, setExtractedTheme] = useState<{ image: string; theme: EventPageTheme } | null>(null);

	useEffect(() => {
		if (!error && !successMessage) {
			return;
		}
		const alertNode = document.getElementById("rsvp-alert");
		alertNode?.scrollIntoView({ behavior: "smooth", block: "center" });
	}, [error, successMessage]);

	const eventTitle = event?.eventName || "RSVP";
	const eventImage = event?.eventImage;
	const eventStartDate = event?.eventStartDate;
	const formattedDate = useMemo(() => {
		if (!eventStartDate) return "";
		const date = new Date(eventStartDate);
		return Number.isNaN(date.getTime())
			? ""
			: date.toLocaleDateString("en-US", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				});
	}, [eventStartDate]);
	const pageTheme =
		eventImage && extractedTheme?.image === eventImage ? extractedTheme.theme : DEFAULT_EVENT_PAGE_THEME;

	useEffect(() => {
		let isMounted = true;
		const loadEvent = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch(withQuery(process.env.NEXT_PUBLIC_API_BASE_URL ?? "", "/events/event", { id: eventId }), {
					cache: "no-store",
				});
				const payload: { data?: EventPayload; message?: string } = await response.json().catch(() => ({}));
				if (!response.ok) {
					throw new Error(payload?.message || "Unable to load event.");
				}
				if (isMounted) {
					setEvent(payload?.data ?? null);
				}
			} catch (err) {
				if (isMounted) {
					setError(err instanceof Error ? err.message : "Unable to load event.");
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		loadEvent();
		return () => {
			isMounted = false;
		};
	}, [eventId]);

	useEffect(() => {
		if (!eventImage) {
			return;
		}

		let isMounted = true;
		extractImageAccentColor(eventImage).then((theme) => {
			if (isMounted && theme) {
				setExtractedTheme({ image: eventImage, theme });
			}
		});

		return () => {
			isMounted = false;
		};
	}, [eventImage]);

	const handleSubmit = async (status: RSVPStatus) => {
		if (!email || !firstName || !lastName || !phoneNumber) {
			setError("Please fill in your first name, last name, email, and phone number.");
			return;
		}
		if (!event) {
			setError("Event details are missing.");
			return;
		}
		setError(null);
		setSuccessMessage(null);
		setSubmitting(true);
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/rsvp/rsvps/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					event: {
						name: event.eventName || "Event",
						eventDate: formattedDate || "TBD",
						eventTime: event.eventTime || "TBD",
						eventId: event.eventId || String(eventId),
						eventImage: event.eventImage || "",
						eventLocation: event.eventAddress || "TBD",
						dressCode: event.dressCode || "-",
						description: event.description || "-",
					},
					email,
					phoneNumber: `${countryCode}${phoneNumber.replace(/\D/g, "").replace(/^0+/, "")}`,
					phoneCountryCode: countryCode,
					firstname: firstName,
					lastname: lastName,
					rsvp: {
						id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
						status,
					},
				}),
			});
			const payload: { message?: string } = await response.json().catch(() => ({}));
			if (!response.ok) {
				throw new Error(payload?.message || "Unable to submit RSVP.");
			}
			setSuccessMessage(status === "declined" ? "You have declined the invitation." : "Your RSVP has been confirmed.");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to submit RSVP.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className='min-h-screen text-white transition-[background-color] duration-700' style={{ backgroundColor: pageTheme.background }}>
			<div className='relative min-h-screen overflow-hidden'>
				{event?.eventImage ? (
					<div className='pointer-events-none absolute inset-0' aria-hidden='true'>
						<Image src={event.eventImage} alt='' fill sizes='100vw' className='scale-110 object-cover opacity-35 blur-3xl' />
						<div className='absolute inset-0 bg-black/45' />
					</div>
				) : null}
				<div
					className='pointer-events-none absolute inset-0'
					style={{
						background: `radial-gradient(circle at top, rgba(${pageTheme.accentRgb}, 0.28), transparent 58%), radial-gradient(circle at bottom, rgba(${pageTheme.accentRgb}, 0.16), transparent 52%)`,
					}}
				/>

				<main className='relative z-10 mx-auto w-full max-w-3xl gap-10 px-6 pb-20 pt-8 lg:flex-row lg:items-start lg:gap-16'>
					<div className='flex-1 space-y-6'>
						<div className=' space-y-4'>
							{event?.eventImage && (
								<div className='relative min-h-56 md:min-h-108 w-full overflow-hidden rounded-2xl'>
									<Image src={event.eventImage} alt={eventTitle} fill className='object-cover' />
								</div>
							)}
							<h1 className='text-4xl font-semibold leading-tight md:text-5xl'>{eventTitle}</h1>
							<p>{event?.description}</p>
						</div>
					</div>

					<RsvpEventDetails
						formattedDate={formattedDate}
						eventTime={event?.eventTime}
						eventAddress={event?.eventAddress}
						dressCode={event?.dressCode}
						accentRgb={pageTheme.accentRgb}
					/>

					<div className='flex-1'>
						<div className=''>
							<h2 className='text-2xl font-semibold'>Kindly Respond</h2>
							<p className='mt-2 text-sm text-white/60'>Confirm or decline your attendance.</p>

							{loading && <p className='mt-6 text-white/60'>Loading event details...</p>}
							{error && (
								<div
									id='rsvp-alert'
									role='alert'
									className='mt-6 flex items-start gap-3 rounded-2xl border border-red-400/40 bg-red-500/15 px-4 py-3 text-red-100 shadow-[0_0_0_1px_rgba(248,113,113,0.12)]'
								>
									<AlertCircle className='mt-0.5 h-5 w-5 shrink-0 text-red-300' aria-hidden='true' />
									<div>
										<p className='text-sm font-semibold text-red-100'>Unable to submit RSVP</p>
										<p className='mt-1 text-sm leading-relaxed text-red-100/90'>{error}</p>
									</div>
								</div>
							)}
							{successMessage && (
								<div
									id='rsvp-alert'
									role='status'
									className='mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-emerald-50 shadow-[0_0_0_1px_rgba(52,211,153,0.12)]'
								>
									<CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-emerald-300' aria-hidden='true' />
									<div>
										<p className='text-sm font-semibold text-emerald-100'>RSVP received</p>
										<p className='mt-1 text-sm leading-relaxed text-emerald-50/90'>{successMessage}</p>
									</div>
								</div>
							)}

							<form
								className='mt-6 space-y-4'
								onSubmit={(event) => {
									event.preventDefault();
								}}
							>
								<div className='grid gap-4 md:grid-cols-2'>
									<input
										type='text'
										placeholder='First name'
										value={firstName}
										onChange={(event) => setFirstName(event.target.value)}
										className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary/60 focus:outline-none'
									/>
									<input
										type='text'
										placeholder='Last name'
										value={lastName}
										onChange={(event) => setLastName(event.target.value)}
										className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary/60 focus:outline-none'
									/>
								</div>
								<input
									type='email'
									placeholder='Email address'
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary/60 focus:outline-none'
								/>
								<div className='grid gap-3 md:grid-cols-3'>
									<label className='flex flex-col gap-2 text-sm text-white/60'>
										Country code
										<select
											value={countryCode}
											onChange={(event) => setCountryCode(event.target.value)}
											className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary/60 focus:outline-none'
										>
											{COUNTRY_CODES.map((code) => (
												<option key={code.value + code.label} value={code.value}>
													{code.label}
												</option>
											))}
										</select>
									</label>
									<label className='flex flex-col gap-2 text-sm text-white/60 md:col-span-2'>
										Phone number
										<input
											type='tel'
											placeholder='Phone number'
											value={phoneNumber}
											onChange={(event) => setPhoneNumber(event.target.value)}
											className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary/60 focus:outline-none'
										/>
									</label>
								</div>
								<div className='mt-6 flex flex-col gap-3 sm:flex-row'>
									<button
										type='button'
										disabled={submitting}
										onClick={() => handleSubmit("confirmed")}
										className='flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:cursor-pointer hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60'
									>
										{submitingLabel(submitting, "I'm Attending")}
									</button>
									<button
										type='button'
										disabled={submitting}
										onClick={() => handleSubmit("declined")}
										className='flex-1 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold hover:cursor-pointer text-white/80 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-60'
									>
										{submitingLabel(submitting, "I can't attend")}
									</button>
								</div>
							</form>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

function submitingLabel(loading: boolean, label: string) {
	return loading ? "Submitting..." : label;
}
