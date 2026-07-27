"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type Attendance = "confirmed" | "declined";
type YesNo = "yes" | "no";

const COUNTRY_CODES = [
	{ label: "Nigeria (+234)", value: "+234" },
	{ label: "Australia (+61)", value: "+61" },
	{ label: "United States (+1)", value: "+1" },
	{ label: "United Kingdom (+44)", value: "+44" },
	{ label: "Ghana (+233)", value: "+233" },
	{ label: "Kenya (+254)", value: "+254" },
	{ label: "South Africa (+27)", value: "+27" },
] as const;

const INVITE_IMAGE = "/wedding/justus2-invite.png";

export default function JustUs2WeddingRsvpPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [countryCode, setCountryCode] = useState("+234");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [accommodation, setAccommodation] = useState<YesNo | "">("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	useEffect(() => {
		if (!error && !successMessage) return;
		document.getElementById("wedding-rsvp-alert")?.scrollIntoView({ behavior: "smooth", block: "center" });
	}, [error, successMessage]);

	const handleSubmit = async (attendance: Attendance) => {
		if (!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNumber.trim()) {
			setError("Please fill in your first name, last name, email, and phone number.");
			return;
		}
		if (!accommodation) {
			setError("Please tell us if you require accommodation in Lagos.");
			return;
		}

		setError(null);
		setSuccessMessage(null);
		setSubmitting(true);

		try {
			const response = await fetch("/api/wedding/oluwaseun-oluwatimilehin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					firstName: firstName.trim(),
					lastName: lastName.trim(),
					email: email.trim(),
					phoneCountryCode: countryCode,
					phoneNumber: `${countryCode}${phoneNumber.replace(/\D/g, "").replace(/^0+/, "")}`,
					attendance,
					accommodation,
				}),
			});
			const payload: { message?: string } = await response.json().catch(() => ({}));
			if (!response.ok) {
				throw new Error(payload.message || "Unable to submit RSVP.");
			}
			setSuccessMessage(
				attendance === "declined"
					? "Thank you — we have noted that you cannot attend."
					: "Thank you — your RSVP has been received.",
			);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to submit RSVP.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div
			className='min-h-screen text-[#1c1714]'
			style={{
				fontFamily: "var(--font-wedding-body), system-ui, sans-serif",
				background:
					"radial-gradient(ellipse at top, #faf6f4 0%, #f3ebe6 42%, #ebe0da 100%)",
			}}
		>
			<div
				className='pointer-events-none fixed inset-0 opacity-40'
				style={{
					backgroundImage:
						"radial-gradient(circle at 12% 88%, rgba(196, 160, 176, 0.28), transparent 34%), radial-gradient(circle at 88% 90%, rgba(176, 150, 184, 0.22), transparent 32%)",
				}}
				aria-hidden
			/>

			<main className='relative z-10 mx-auto w-full max-w-2xl px-5 pb-20 pt-8 sm:px-8'>
				<header className='text-center'>
					<p
						className='text-[11px] uppercase tracking-[0.35em] text-[#7a6a66]'
						style={{ fontFamily: "var(--font-wedding-body)" }}
					>
						#JUSTUS2
					</p>
					<div className='relative mx-auto mt-5 aspect-3/4 w-full max-w-md overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(40,28,24,0.18)]'>
						<Image
							src={INVITE_IMAGE}
							alt='Wedding invitation for Oluwaseun and Oluwatimilehin'
							fill
							priority
							sizes='(max-width: 768px) 100vw, 448px'
							className='object-cover object-top'
						/>
					</div>
					<h1
						className='mt-8 text-4xl leading-tight tracking-wide text-[#1c1714] sm:text-5xl'
						style={{ fontFamily: "var(--font-wedding-display), Georgia, serif", fontWeight: 500 }}
					>
						Oluwaseun
						<span className='mx-2 inline-block text-2xl text-[#a88796] sm:text-3xl'>&</span>
						Oluwatimilehin
					</h1>
					<p className='mt-3 text-sm tracking-wide text-[#6f5f5a]'>
						Tuesday, 22 December 2026 · Victoria Island, Lagos
					</p>
					<div className='mx-auto mt-5 h-px w-24 bg-[#c9b4bc]/ />
					<p className='mt-5 text-sm leading-relaxed text-[#5c4f4b]'>
						The families of Mr. Olanrewaju &amp; Mrs. Eunice Oloruntoba and Mr. Olugbenga &amp; Mrs.
						Aderemi Ademulegun cordially invite you to celebrate with them.
					</p>
				</header>

				<section className='mt-10 rounded-2xl border border-[#d9ccc6]/bg-[#fffcfa]/80 p-6 shadow-[0_12px_40px_rgba(40,28,24,0.06)] backdrop-blur-sm sm:p-8'>
					<h2
						className='text-center text-3xl text-[#1c1714]'
						style={{ fontFamily: "var(--font-wedding-display), Georgia, serif", fontWeight: 500 }}
					>
						Kindly Respond
					</h2>
					<p className='mt-2 text-center text-sm text-[#7a6a66]'>Confirm or decline your attendance.</p>

					{error && (
						<div
							id='wedding-rsvp-alert'
							role='alert'
							className='mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-900'
						>
							<AlertCircle className='mt-0.5 h-5 w-5 shrink-0 text-red-500' aria-hidden />
							<div>
								<p className='text-sm font-semibold'>Unable to submit RSVP</p>
								<p className='mt-1 text-sm'>{error}</p>
							</div>
						</div>
					)}

					{successMessage && (
						<div
							id='wedding-rsvp-alert'
							role='status'
							className='mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-950'
						>
							<CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-emerald-600' aria-hidden />
							<div>
								<p className='text-sm font-semibold'>RSVP received</p>
								<p className='mt-1 text-sm'>{successMessage}</p>
							</div>
						</div>
					)}

					{!successMessage && (
						<form
							className='mt-6 space-y-4'
							onSubmit={(event) => {
								event.preventDefault();
							}}
						>
							<div className='grid gap-4 sm:grid-cols-2'>
								<input
									type='text'
									placeholder='First name'
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className='w-full rounded-xl border border-[#ddd0ca] bg-white px-4 py-3 text-sm text-[#1c1714] placeholder:text-[#9a8b86] focus:border-[#b892a2] focus:outline-none'
								/>
								<input
									type='text'
									placeholder='Last name'
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className='w-full rounded-xl border border-[#ddd0ca] bg-white px-4 py-3 text-sm text-[#1c1714] placeholder:text-[#9a8b86] focus:border-[#b892a2] focus:outline-none'
								/>
							</div>
							<input
								type='email'
								placeholder='Email address'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='w-full rounded-xl border border-[#ddd0ca] bg-white px-4 py-3 text-sm text-[#1c1714] placeholder:text-[#9a8b86] focus:border-[#b892a2] focus:outline-none'
							/>
							<div className='grid gap-3 sm:grid-cols-3'>
								<label className='flex flex-col gap-2 text-sm text-[#6f5f5a]'>
									Country code
									<select
										value={countryCode}
										onChange={(e) => setCountryCode(e.target.value)}
										className='w-full rounded-xl border border-[#ddd0ca] bg-white px-4 py-3 text-sm text-[#1c1714] focus:border-[#b892a2] focus:outline-none'
									>
										{COUNTRY_CODES.map((code) => (
											<option key={code.value + code.label} value={code.value}>
												{code.label}
											</option>
										))}
									</select>
								</label>
								<label className='flex flex-col gap-2 text-sm text-[#6f5f5a] sm:col-span-2'>
									Phone number
									<input
										type='tel'
										placeholder='Phone number'
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
										className='w-full rounded-xl border border-[#ddd0ca] bg-white px-4 py-3 text-sm text-[#1c1714] placeholder:text-[#9a8b86] focus:border-[#b892a2] focus:outline-none'
									/>
								</label>
							</div>

							<fieldset className='rounded-xl border border-[#ddd0ca] bg-white px-4 py-4'>
								<legend className='px-1 text-sm font-medium text-[#5c4f4b]'>
									Do you require accommodation in Lagos?
								</legend>
								<div className='mt-2 flex flex-wrap gap-4'>
									<label className='flex items-center gap-2 text-sm text-[#1c1714]'>
										<input
											type='radio'
											name='accommodation'
											value='yes'
											checked={accommodation === "yes"}
											onChange={() => setAccommodation("yes")}
											className='accent-[#9b7384]'
										/>
										Yes
									</label>
									<label className='flex items-center gap-2 text-sm text-[#1c1714]'>
										<input
											type='radio'
											name='accommodation'
											value='no'
											checked={accommodation === "no"}
											onChange={() => setAccommodation("no")}
											className='accent-[#9b7384]'
										/>
										No
									</label>
								</div>
							</fieldset>

							<div className='mt-2 flex flex-col gap-3 sm:flex-row'>
								<button
									type='button'
									disabled={submitting}
									onClick={() => handleSubmit("confirmed")}
									className='flex-1 rounded-xl bg-[#1c1714] px-4 py-3 text-sm font-semibold text-[#fffcfa] transition hover:bg-[#9b7384] disabled:cursor-not-allowed disabled:opacity-60'
								>
									{submitting ? "Submitting..." : "I'm Attending"}
								</button>
								<button
									type='button'
									disabled={submitting}
									onClick={() => handleSubmit("declined")}
									className='flex-1 rounded-xl border border-[#c9b4bc] px-4 py-3 text-sm font-semibold text-[#5c4f4b] transition hover:border-[#9b7384] hover:text-[#1c1714] disabled:cursor-not-allowed disabled:opacity-60'
								>
									{submitting ? "Submitting..." : "I can't attend"}
								</button>
							</div>
						</form>
					)}
				</section>

				<p className='mt-10 text-center text-[11px] uppercase tracking-[0.3em] text-[#9a8b86]'>#JUSTUS2</p>
			</main>
		</div>
	);
}
