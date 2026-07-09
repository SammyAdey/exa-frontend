"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
	{
		question: "What is exa?",
		answer:
			"Exa is an event management platform that brings guest lists, ticketing, table bookings, and door access control into one workspace. Organizers run events from setup through check-in without juggling multiple tools.",
	},
	{
		question: "How does it work?",
		answer:
			"Create your event, set up tickets or guest lists, and share registration links with attendees. When guests arrive, staff scan QR codes at the door to verify entry in real time. Sales, RSVPs, and check-ins sync to your dashboard automatically.",
	},
	{
		question: "Who is exa for?",
		answer:
			"Exa is built for event organizers, venues, promoters, and brands running anything from concerts and club nights to weddings and private occasions. If you need tickets, guest lists, or controlled entry, Exa fits.",
	},
	{
		question: "How does exa work?",
		answer:
			"You manage events from a central dashboard — configure ticket types, guest lists, or table packages, then track revenue and attendance live. Attendees receive digital tickets or confirmations, and your team validates them at the door with a quick scan.",
	},
	{
		question: "How does pricing work?",
		answer:
			"Pricing depends on your event size and the features you need. Core tools like ticketing and guest list management are available on standard plans, with custom options for larger venues or white-label setups. Contact us for a quote tailored to your event.",
	},
	{
		question: "What is access control?",
		answer:
			"Access control is how you verify who enters your event. Exa issues unique QR codes for each ticket or guest, so door staff can scan, confirm validity instantly, and prevent duplicate or unauthorized entry — every check-in is logged.",
	},
	{
		question: "How do I use exa?",
		answer:
			"Sign up, create your first event, and configure tickets or a guest list. Share your registration link, monitor sign-ups from the dashboard, and use the check-in tool on event day. Our team can also walk you through setup if you book a demo.",
	},
];

export default function FaqAccordion() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const toggle = (index: number) => {
		setOpenIndex((current) => (current === index ? null : index));
	};

	return (
		<div className='space-y-1'>
			{faqs.map((faq, index) => {
				const isOpen = openIndex === index;
				return (
					<div key={faq.question} className='border-b border-white/10'>
						<button
							type='button'
							onClick={() => toggle(index)}
							aria-expanded={isOpen}
							className='flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors duration-200 hover:text-white/90'
						>
							<span className='text-lg font-medium capitalize'>{faq.question}</span>
							<ChevronDown
								size={20}
								className={`shrink-0 text-white/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
								aria-hidden='true'
							/>
						</button>
						<div
							className={`grid transition-all duration-200 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
						>
							<div className='overflow-hidden'>
								<p className='px-4 pb-4 text-sm leading-relaxed text-white/60'>{faq.answer}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
