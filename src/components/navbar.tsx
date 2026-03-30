"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronDown, Ticket, User } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

type SubmenuItem = {
	label: string;
	link: string;
	subheading: string;
	icon: ReactNode;
};

type MenuItem = {
	label: string;
	link: string;
	submenu?: SubmenuItem[];
};

export default function Navbar() {
	const menu: MenuItem[] = [
		{
			label: "Services",
			link: "/services",
			submenu: [
				{
					label: "ticketing",
					link: "/services/ticketing",
					subheading: "Sell tickets with ease.",
					icon: <Ticket size={30} />,
				},
				{
					label: "guestlisting",
					link: "/services/guestlisting",
					subheading: "Manage guests effortlessly.",
					icon: <User size={30} />,
				},
				{
					label: "RSVPs",
					link: "/services/rsvps",
					subheading: "Track responses in real time.",
					icon: <Calendar size={30} />,
				},
			],
		},
		{
			label: "Events",
			link: "https://theexhibit.co",
		},
		{
			label: "Contact",
			link: "/contact",
		},
	];

	return (
		<header className='relative z-10 mx-auto flex w-full items-center justify-between px-10 py-6'>
			<div className='flex items-center gap-14'>
				<Image className='w-[80px]' width={80} height={80} alt='Logo' src='/Logo.svg' />

				<nav>
					<div className='flex gap-8'>
						{menu.map((item) => (
							<NavItem key={item.label} item={item} />
						))}
					</div>
				</nav>
			</div>

			<div className='flex items-center gap-10'>
				<div className='flex gap-3'>
					<Link
						href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/login`}
						className='flex justify-center w-[100px] cursor-pointer rounded-sm border px-5 py-2 text-white/80 transition hover:border-white hover:text-white'
					>
						Login
					</Link>

					<Link
						href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/signup`}
						className='w-[100px] rounded-sm bg-white px-5 py-2 text-center capitalize text-black transition hover:bg-primary hover:text-white'
					>
						Sign Up
					</Link>
				</div>
			</div>
		</header>
	);
}

function NavItem({ item }: { item: MenuItem }) {
	if (item.submenu?.length) {
		return <SidebarDropdown item={item} />;
	}

	return (
		<div className='cursor-pointer font-semibold capitalize text-white/80 transition hover:text-white'>
			<Link href={item.link} className='flex items-center gap-1'>
				{item.label}
			</Link>
		</div>
	);
}

function SidebarDropdown({ item }: { item: MenuItem }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<li className='relative list-none'>
			<div className='relative' onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
				<Link href={item.link} className='flex items-center gap-1 capitalize font-semibold text-white/80 transition hover:text-white'>
					{item.label}
					<span className={`ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
						<ChevronDown size={18} />
					</span>
				</Link>

				{isOpen && (
					<div className='absolute left-0 top-full pt-4 z-50'>
						<div className='w-[360px] rounded-md bg-[#1A1A1B] p-7 shadow-lg'>
							<div className='space-y-6'>
								{item.submenu?.map((subitem) => (
									<div key={subitem.label}>
										<Link href={subitem.link} className='flex items-center gap-5 text-white/80 transition hover:text-white'>
											<span className='rounded-md text-primary/70 shrink-0'>{subitem.icon}</span>

											<div className='flex flex-col gap-1'>
												<span className='font-bold capitalize'>{subitem.label}</span>
												<span className='text-sm text-white/40'>{subitem.subheading}</span>
											</div>
										</Link>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</li>
	);
}
