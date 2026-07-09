import type { LucideIcon } from "lucide-react";
import { Calendar, Clock, Drama, MapPin } from "lucide-react";

type RsvpEventDetailsProps = {
	formattedDate: string;
	eventTime?: string;
	eventAddress?: string;
	dressCode?: string;
	accentRgb: string;
};

type DetailCardProps = {
	icon: LucideIcon;
	label: string;
	accentRgb: string;
	children: React.ReactNode;
	className?: string;
};

function DetailCard({ icon: Icon, label, accentRgb, children, className = "" }: DetailCardProps) {
	return (
		<article
			className={`group rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-md transition-[border-color,background-color] duration-200 hover:border-white/20 hover:bg-white/9 ${className}`}
		>
			<div className='flex items-start gap-4'>
				<div
					className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10'
					style={{ backgroundColor: `rgba(${accentRgb}, 0.18)` }}
				>
					<Icon className='h-5 w-5 text-white' strokeWidth={1.75} aria-hidden='true' />
				</div>
				<div className='min-w-0 flex-1'>
					<p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50'>{label}</p>
					<div className='mt-2 space-y-1 text-[15px] leading-relaxed text-white/90'>{children}</div>
				</div>
			</div>
		</article>
	);
}

export default function RsvpEventDetails({ formattedDate, eventTime, eventAddress, dressCode, accentRgb }: RsvpEventDetailsProps) {
	const dateLabel = formattedDate || "Date to be announced";
	const timeLabel = eventTime || "Time to be announced";
	const locationLabel = eventAddress || "Location details will be shared soon.";
	const dressCodeLabel = dressCode?.trim() || "Not specified";

	return (
		<section aria-label='Event details' className='my-12 md:my-16'>
			<div className='mb-5'>
				<p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45'>Event details</p>
				<h2 className='mt-1 text-xl font-medium tracking-tight text-white md:text-2xl'>Everything you need to know</h2>
			</div>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
				<DetailCard icon={Calendar} label='Date' accentRgb={accentRgb}>
					<p>{dateLabel}</p>
				</DetailCard>

				<DetailCard icon={Clock} label='Time' accentRgb={accentRgb}>
					<p>{timeLabel}</p>
				</DetailCard>

				<DetailCard icon={MapPin} label='Location' accentRgb={accentRgb} className='md:col-span-2'>
					<p className='text-pretty'>{locationLabel}</p>
				</DetailCard>

				<DetailCard icon={Drama} label='Dress code' accentRgb={accentRgb} className='md:col-span-2'>
					<p className='text-pretty'>{dressCodeLabel}</p>
				</DetailCard>
			</div>
		</section>
	);
}
