import Link from "next/link";

export default function ContactPage() {
	return (
		<div className='min-h-screen bg-[#0b0b0c] text-white'>
			<div className='mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16'>
				<div className='flex items-center justify-between'>
					<h1 className='text-4xl font-semibold tracking-tight'>Contact us</h1>
					<Link href='/' className='text-sm uppercase tracking-[0.3em] text-white/60 hover:text-white'>
						Back home
					</Link>
				</div>
				<p className='text-white/70'>
					Tell us about your event, venue, or product needs and our team will reach out with the right plan.
				</p>
				<form className='grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8'>
					<div className='grid gap-2'>
						<label className='text-xs uppercase tracking-[0.3em] text-white/60'>Full name</label>
						<input
							className='rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none'
							placeholder='Jane Doe'
							type='text'
							name='name'
						/>
					</div>
					<div className='grid gap-2'>
						<label className='text-xs uppercase tracking-[0.3em] text-white/60'>Email address</label>
						<input
							className='rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none'
							placeholder='jane@venue.com'
							type='email'
							name='email'
						/>
					</div>
					<div className='grid gap-2'>
						<label className='text-xs uppercase tracking-[0.3em] text-white/60'>Company</label>
						<input
							className='rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none'
							placeholder='Venue name'
							type='text'
							name='company'
						/>
					</div>
					<div className='grid gap-2'>
						<label className='text-xs uppercase tracking-[0.3em] text-white/60'>Message</label>
						<textarea
							className='min-h-[140px] rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none'
							placeholder='Share your goals and event schedule.'
							name='message'
						/>
					</div>
					<button className='w-full rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase text-black transition hover:bg-primary hover:text-white'>
						Send message
					</button>
				</form>
			</div>
		</div>
	);
}
