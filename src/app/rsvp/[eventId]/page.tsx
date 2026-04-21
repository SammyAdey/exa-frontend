"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { Calendar, Drama, Map } from "lucide-react";

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

export default function RSVPPage() {
	const { eventId } = useParams();
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

	const eventTitle = event?.eventName || "RSVP";
	const formattedDate = useMemo(() => {
		if (!event?.eventStartDate) return "";
		const date = new Date(event.eventStartDate);
		return Number.isNaN(date.getTime())
			? ""
			: date.toLocaleDateString("en-US", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				});
	}, [event?.eventStartDate]);

	useEffect(() => {
		let isMounted = true;
		const loadEvent = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/event?id=${eventId}`, {
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
					phoneNumber: `${countryCode}${phoneNumber}`,
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
		<div className='min-h-screen bg-[#0B0B0C] text-white'>
			<div className='min-h-screen relative overflow-hidden'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(158,0,255,0.18),_transparent_55%)]' />
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(0,255,204,0.12),_transparent_50%)]' />

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

					<div className='my-20 grid grid-cols-3 gap-4'>
						<div className='flex gap-2'>
							<div>
								<div className='p-3 bg-white inline-flex w-wrap h-wrap items-center justify-center rounded-md'>
									<Calendar className='text-black' />
								</div>
							</div>
							<div className='flex flex-col'>
								<h4 className='text-xs uppercase font-semibold text-gray-400'>Date & Time</h4>
								<p className='mt-1 text-white/90 text-lg'>
									{formattedDate || "Date to be announced"} · {event?.eventTime || "Time to be announced"}
								</p>
							</div>
						</div>
						<div className='flex gap-2'>
							<div>
								<div className='p-3 bg-white inline-flex items-center justify-center rounded-md'>
									<Map className='text-black' />
								</div>
							</div>
							<div className='flex flex-col'>
								<h4 className='text-xs uppercase font-semibold text-gray-400'>Location</h4>
								<p className='mt-1 text-white/90 text-lg'>{event?.eventAddress || "Location details will be shared soon."}</p>
							</div>
						</div>
						<div className='flex gap-2'>
							<div>
								<div className='p-3 bg-white inline-flex w-wrap h-wrap items-center justify-center rounded-md'>
									<Drama className='text-black' />
								</div>
							</div>
							<div className='flex flex-col'>
								<h4 className='text-xs uppercase font-semibold text-gray-400'>Dress Code</h4>
								<p className='mt-1 text-white/90 text-lg'>{event?.dressCode || "-"}</p>
							</div>
						</div>
					</div>

					<div className='flex-1'>
						<div className=''>
							<h2 className='text-2xl font-semibold'>Kindly Respond</h2>
							<p className='mt-2 text-sm text-white/60'>Confirm or decline your attendance.</p>

							{loading && <p className='mt-6 text-white/60'>Loading event details...</p>}
							{error && <p className='mt-6 text-sm text-red-300'>{error}</p>}
							{successMessage && <p className='mt-6 text-sm text-emerald-300'>{successMessage}</p>}

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
											<option value='+234'>Nigeria (+234)</option>
											<option value='+1'>United States (+1)</option>
											<option value='+44'>United Kingdom (+44)</option>
											<option value='+233'>Ghana (+233)</option>
											<option value='+254'>Kenya (+254)</option>
											<option value='+27'>South Africa (+27)</option>
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
										className='flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60'
									>
										{submitingLabel(submitting, "Confirm RSVP")}
									</button>
									<button
										type='button'
										disabled={submitting}
										onClick={() => handleSubmit("declined")}
										className='flex-1 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-60'
									>
										{submitingLabel(submitting, "Decline")}
									</button>
								</div>
							</form>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		</div>
	);
}

function submitingLabel(loading: boolean, label: string) {
	return loading ? "Submitting..." : label;
}
