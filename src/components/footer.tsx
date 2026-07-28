import Link from "next/link";

export default function Footer() {
	return (
		<footer className='align-end relative z-10 mx-auto flex w-full justify-center border-t border-white/10 px-10 pb-10 text-sm uppercase text-white/40'>
			<div className='flex flex-wrap items-center justify-between gap-4 pt-6 lg:w-[78vw]'>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
					<span>EXA © 2026</span>
					<span className='hidden text-white/20 sm:inline' aria-hidden>
						·
					</span>
					<p className='normal-case tracking-normal'>
						exa powered by{" "}
						<Link
							href='https://theexhibit.co'
							target='_blank'
							rel='noopener noreferrer'
							className='text-white/60 underline-offset-4 transition hover:text-white hover:underline'
						>
							theexhibit.co
						</Link>
					</p>
				</div>
				<div className='flex flex-wrap gap-6'>
					<span>Privacy</span>
					<span>Terms</span>
					<span>Instagram</span>
				</div>
			</div>
		</footer>
	);
}
