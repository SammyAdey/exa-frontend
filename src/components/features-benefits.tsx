import { Grid2x2Plus, Lock, Maximize2 } from "lucide-react";

const features = [
	{
		id: "privacy",
		icon: Lock,
		title: (
			<>
				100% <span className='text-transparent bg-gradient-to-br from-[#C3A8FF] to-primary  bg-clip-text'>private</span> database
			</>
		),
		description: "Only you have access to and control over the customer data you generate - not us, and definitely not your competitors.",
	},
	{
		id: "white-label",
		icon: Maximize2,
		title: (
			<>
				White Label and <span className='text-transparent bg-gradient-to-br from-[#C3A8FF] to-primary bg-clip-text'>API Experience</span>
			</>
		),
		description:
			"Your brand is front and center. We stay behind the scenes to make your events unforgettable, with full white-label and API support.",
	},
	{
		id: "payments",
		icon: Grid2x2Plus,
		title: (
			<>
				Payment methods <span className='text-transparent bg-gradient-to-r from-[#C3A8FF] to-primary bg-clip-text'>suitable for all attendees</span>
			</>
		),
		description: "All the payment methods are available so that your customers don't have an excuse to complete the purchase.",
	},
];

export default function FeaturesBenefits() {
	return (
		<section className='w-full'>
			<div className='w-[80%] px-12 m-auto grid gap-5 md:grid-cols-3'>
				{features.map((feature) => {
					const Icon = feature.icon;
					return (
						<div key={feature.id} className='rounded-2xl border border-white/[0.08] bg-[#111113] p-8 sm:p-10'>
							<div className='mb-10 inline-flex'>
								<Icon size={56} strokeWidth={1.25} className='text-[#C3A8FF]' aria-hidden='true' />
							</div>
							<h3 className='text-2xl font-bold leading-snug tracking-tight text-white sm:text-[1.65rem]'>{feature.title}</h3>
							<p className='mt-5 text-base leading-relaxed text-white/55'>{feature.description}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
