"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from "../../../utils/country-codes";

type Attendance = "confirmed" | "declined";
type YesNo = "yes" | "no";

const INVITE_FROM_OPTIONS = [
	"Seun Ademulegun",
	"Timi Ademulegun",
	"Olumide Oloruntoba",
	"Nike Konneh",
	"Damilola Ayeni",
	"Niniola Oloruntoba",
	"Seun Oloruntoba",
	"Dami Ademulegun",
	"Toni Ademulegun",
	"Posi Ademulegun",
] as const;

const INVITE_IMAGE = "/wedding/justus2-invite.png";

const styles = {
	pageText: { color: "#1c1714" },
	muted: { color: "#7a6a66" },
	soft: { color: "#6f5f5a" },
	body: { color: "#5c4f4b" },
	blush: { color: "#a88796" },
	rule: { backgroundColor: "#c9b4bc" },
	card: {
		borderColor: "#d9ccc6",
		backgroundColor: "rgba(255, 252, 250, 0.8)",
	},
	input: {
		borderColor: "#ddd0ca",
		color: "#1c1714",
	},
	primaryBtn: {
		backgroundColor: "#1c1714",
		color: "#fffcfa",
	},
} as const;

export default function JustUs2WeddingRsvpPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [accommodation, setAccommodation] = useState<YesNo | "">("");
	const [inviteFrom, setInviteFrom] = useState("");
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
		if (!inviteFrom) {
			setError("Please select who you received the invite from.");
			return;
		}

		setError(null);
		setSuccessMessage(null);
		setSubmitting(true);

		try {
			const response = await fetch("/api/wedding/justus2", {
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
					inviteFrom,
				}),
			});
			const payload: { message?: string } = await response.json().catch(() => ({}));
			if (!response.ok) {
				throw new Error(payload.message || "Unable to submit RSVP.");
			}
			setSuccessMessage(attendance === "declined" ? "Thank you — we have noted that you cannot attend." : "Thank you — your RSVP has been received.");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to submit RSVP.");
		} finally {
			setSubmitting(false);
		}
	};

	const inputClass =
		"w-full rounded-xl border bg-white px-4 py-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400";

	return (
		<div
			className='min-h-screen'
			style={{
				...styles.pageText,
				fontFamily: "var(--font-wedding-body), system-ui, sans-serif",
				background: "radial-gradient(ellipse at top, #faf6f4 0%, #f3ebe6 42%, #ebe0da 100%)",
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
					<p className='text-[11px] tracking-[0.35em]' style={{ ...styles.muted, fontFamily: "var(--font-wedding-body)" }}>
						{"#juSTus2"}
					</p>
					<div
						className='relative mx-auto mt-5 w-full max-w-md overflow-hidden rounded-sm'
						style={{
							aspectRatio: "3 / 4",
							boxShadow: "0 24px 60px rgba(40,28,24,0.18)",
						}}
					>
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
						className='mt-8 text-4xl leading-tight tracking-wide sm:text-5xl'
						style={{
							...styles.pageText,
							fontFamily: "var(--font-wedding-display), Georgia, serif",
							fontWeight: 500,
						}}
					>
						Oluwaseun
						<span className='mx-2 inline-block text-2xl sm:text-3xl' style={styles.blush}>
							&
						</span>
						Oluwatimilehin
					</h1>
					<p className='mt-3 text-sm tracking-wide' style={styles.soft}>
						Tuesday, 22 December 2026 · Victoria Island, Lagos
					</p>
					<div className='mx-auto mt-5 h-px w-24' style={styles.rule} />
					<p className='mt-5 text-sm leading-relaxed' style={styles.body}>
						The families of Mr. Olanrewaju &amp; Mrs. Eunice Oloruntoba and Mr. Olugbenga &amp; Mrs. Aderemi Ademulegun cordially invite you to
						celebrate with them.
					</p>
				</header>

				<section
					className='mt-10 rounded-2xl border p-6 backdrop-blur-sm sm:p-8'
					style={{
						...styles.card,
						boxShadow: "0 12px 40px rgba(40,28,24,0.06)",
					}}
				>
					<h2
						className='text-center text-3xl'
						style={{
							...styles.pageText,
							fontFamily: "var(--font-wedding-display), Georgia, serif",
							fontWeight: 500,
						}}
					>
						Kindly Respond
					</h2>
					<p className='mt-2 text-center text-sm' style={styles.muted}>
						Confirm or decline your attendance.
					</p>

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
									className={inputClass}
									style={styles.input}
								/>
								<input
									type='text'
									placeholder='Last name'
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className={inputClass}
									style={styles.input}
								/>
							</div>
							<input
								type='email'
								placeholder='Email address'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={inputClass}
								style={styles.input}
							/>
							<div className='grid gap-3 sm:grid-cols-3'>
								<label className='flex flex-col gap-2 text-sm' style={styles.soft}>
									Country code
									<select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className={inputClass} style={styles.input}>
										{COUNTRY_CODES.map((code) => (
											<option key={code.name} value={code.value}>
												{code.label}
											</option>
										))}
									</select>
								</label>
								<label className='flex flex-col gap-2 text-sm sm:col-span-2' style={styles.soft}>
									Phone number
									<input
										type='tel'
										placeholder='Phone number'
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
										className={inputClass}
										style={styles.input}
									/>
								</label>
							</div>

							<label className='flex flex-col gap-2 text-sm' style={styles.soft}>
								Who did you receive the invite from?
								<select value={inviteFrom} onChange={(e) => setInviteFrom(e.target.value)} className={inputClass} style={styles.input} required>
									<option value='' disabled>
										Select a name
									</option>
									{INVITE_FROM_OPTIONS.map((name) => (
										<option key={name} value={name}>
											{name}
										</option>
									))}
								</select>
							</label>

							<fieldset className='rounded-xl border bg-white px-4 py-4' style={{ borderColor: "#ddd0ca" }}>
								<legend className='px-1 text-sm font-medium' style={styles.body}>
									Do you require accommodation in Lagos?
								</legend>
								<div className='mt-2 flex flex-wrap gap-4'>
									<label className='flex items-center gap-2 text-sm' style={styles.pageText}>
										<input type='radio' name='accommodation' value='yes' checked={accommodation === "yes"} onChange={() => setAccommodation("yes")} />
										Yes
									</label>
									<label className='flex items-center gap-2 text-sm' style={styles.pageText}>
										<input type='radio' name='accommodation' value='no' checked={accommodation === "no"} onChange={() => setAccommodation("no")} />
										No
									</label>
								</div>
							</fieldset>

							<div className='mt-2 flex flex-col gap-3 sm:flex-row'>
								<button
									type='button'
									disabled={submitting}
									onClick={() => handleSubmit("confirmed")}
									className='flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
									style={styles.primaryBtn}
								>
									{submitting ? "Submitting..." : "I'm Attending"}
								</button>
								<button
									type='button'
									disabled={submitting}
									onClick={() => handleSubmit("declined")}
									className='flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60'
									style={{ borderColor: "#c9b4bc", color: "#5c4f4b" }}
								>
									{submitting ? "Submitting..." : "I can't attend"}
								</button>
							</div>
						</form>
					)}
				</section>

				<p className='mt-10 text-center text-[11px] tracking-[0.3em]' style={{ color: "#9a8b86" }}>
					{"#juSTus2"}
				</p>
			</main>
		</div>
	);
}
