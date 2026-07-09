import { ChevronRight, QrCode, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const highlights = [
	{
		icon: QrCode,
		title: "Instant door check-in",
		description: "Scan tickets and verify guests in seconds — no bottlenecks at entry.",
	},
	{
		icon: Users,
		title: "Unified guest lists",
		description: "Concerts, weddings, or private occasions — one list, one flow.",
	},
	{
		icon: ShieldCheck,
		title: "Verified access only",
		description: "Every attendee accounted for before they step through the door.",
	},
];

export default function AccessFeatureSection() {
	return (
		<section className='relative mx-auto w-[80%] overflow-hidden'>
			<div
				className='pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]'
				aria-hidden='true'
			/>

			<div className='relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16'>
				<div className='flex flex-col gap-8'>
					<div className='inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white'>
						Access control
						<ChevronRight size={14} aria-hidden='true' />
					</div>

					<div className='space-y-5'>
						<h2 className='text-5xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]'>
							Where access feels{" "}
							<span className='text-transparent bg-gradient-to-br from-[#C3A8FF] via-primary to-white bg-clip-text'>effortless.</span>
						</h2>
						<p className='max-w-xl text-base leading-relaxed text-white/60 sm:text-lg'>
							A unified platform for ticketed events and controlled-access occasions. Sell tickets for your concert or manage a verified guest list
							for your wedding, with every entry checked at the door and every guest accounted for.
						</p>
					</div>

					<ul className='space-y-4'>
						{highlights.map((item) => {
							const Icon = item.icon;
							return (
								<li
									key={item.title}
									className='group flex cursor-default gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:border-primary/25 hover:bg-primary/[0.04]'
								>
									<span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors duration-200 group-hover:bg-primary/25'>
										<Icon size={20} strokeWidth={1.75} aria-hidden='true' />
									</span>
									<div className='space-y-1'>
										<p className='font-semibold text-white'>{item.title}</p>
										<p className='leading-relaxed text-white/55'>{item.description}</p>
									</div>
								</li>
							);
						})}
					</ul>

					<Link
						href='/contact'
						className='inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-black transition-all duration-200 hover:bg-primary hover:text-white'
					>
						See how it works
						<ChevronRight size={16} aria-hidden='true' />
					</Link>
				</div>

				<div className='relative'>
					<div className='relative overflow-hidden rounded-3xl p-[2px] shadow-[0_0_60px_-16px_rgba(158,0,255,0.35)]'>
						<div className='pointer-events-none absolute inset-0 overflow-hidden rounded-3xl' aria-hidden='true'>
							<div className='animated-border-beam absolute left-1/2 top-1/2 aspect-square w-[200%] bg-[conic-gradient(from_0deg,transparent_60%,rgba(158,0,255,0.15)_70%,#9E00FF_80%,#c084fc_88%,transparent_96%)]' />
						</div>
						<div className='relative overflow-hidden rounded-[1.375rem] border border-white/10 bg-[#111113]'>
							<Image
								src='/images/ticket-scanning.png'
								alt='Staff scanning a guest ticket at an event entrance'
								width={1200}
								height={800}
								className='block h-auto w-full'
							/>
						</div>
					</div>
					<div className='absolute bottom-4 right-4 hidden rounded-2xl border border-white/10 bg-[#111113]/90 px-5 py-4 backdrop-blur-md sm:block'>
						<p className='text-2xl font-bold text-white'>100%</p>
						<p className='text-xs uppercase tracking-wide text-white/50'>Verified at the door</p>
					</div>
				</div>
			</div>
		</section>
	);
}
