import { Calendar, ChevronRight, DollarSign, LogIn, Mail, Table2, Ticket, User } from "lucide-react";
import Link from "next/link";
import Footer from "../components/footer";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";

const body = Inter({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

export default function Home() {
	return (
		<div className={`${body.className} min-h-screen bg-[#0b0b0c] text-white`}>
			<div className='relative overflow-hidden'>
				{/* <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,214,102,0.16),_transparent_55%),radial-gradient(circle_at_20%_80%,_rgba(255,102,102,0.2),_transparent_45%)]' /> */}
				{/* <div className='pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[conic-gradient(from_120deg,_#ffb347,_#ffcc33,_#ff7a59,_#ffb347)] opacity-20 blur-3xl' /> */}
				{/* <div className='pointer-events-none absolute -bottom-32 left-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_60%)] blur-2xl' /> */}
				<Navbar />

				<main className='relative w-[80%] z-10 mx-auto flex flex-col gap-16 px-6 pb-24 pt-12'>
					<section className='flex flex-col justify-center items-center gap-12'>
						<div className='flex flex-col w-[60%] h-[60vh] justify-center items-center gap-8'>
							<div className='inline-flex justify-center flex-wrap items-center gap-4 py-2 px-6 rounded-full border border-primary'>
								<p className='text-[18px]'>Guest management, ticketing, and access control</p>
								<ChevronRight className='text-primary' size={20} />
							</div>
							<h1 className='text-5xl font-normal text-center leading-[1em] mt-[-20px] tracking-[-0.03em] sm:text-6xl lg:text-8xl'>
								The event <span className='text-primary'>platform</span> built for everything.
							</h1>
							<p className='w-full text-center text-base text-white/70 sm:text-lg'>
								EXA brings guest lists, table bookings, ticketing, and real-time insights into one sleek workspace. Launch events faster, fill venues
								smarter, and track every guest touchpoint.
							</p>
							<div className='flex flex-wrap gap-4 mt-[20px]'>
								<Link href='https://cal.com/arcxne/1-hour-meeting'>
									<button className='rounded-[4px] flex items-center justify-center bg-white px-7 py-3 text-sm font-semibold uppercase text-black hover:text-white duration-300 hover:bg-primary cursor-pointer'>
										<Calendar className='mr-2' size={20} /> Book a demo
									</button>
								</Link>
							</div>
						</div>
					</section>

					<section className='grid gap-6 rounded-3xl'>
						<div className='grid gap-7 md:grid-cols-3 px-12'>
							{[
								{
									icon: <LogIn className='text-primary' size={24} />,
									title: "Instant check-in",
									desc: "QR scanning, smart waitlists, and priority flows keep the line moving.",
								},
								{
									icon: <Ticket className='text-primary' size={24} />,
									title: "Ticketing",
									desc: "Capture preferences, spend history, and VIP notes with every visit.",
								},
								{
									icon: <DollarSign className='text-primary' size={24} />,
									title: "Revenue control",
									desc: "Track bottle service, promoter splits, and nightly reports in one view.",
								},
								{
									icon: <Calendar className='text-primary' size={24} />,
									title: "RSVPs",
									desc: "Track bottle service, promoter splits, and nightly reports in one view.",
								},
								{
									icon: <User className='text-primary' size={24} />,
									title: "Guest List Management",
									desc: "Capture preferences, spend history, and VIP notes with every visit.",
								},
								{
									icon: <Table2 className='text-primary' size={24} />,
									title: "Table bookings",
									desc: "Track bottle service, promoter splits, and nightly reports in one view.",
								},
							].map((item) => (
								<div key={item.title} className='rounded-2xl border border-white/10 bg-white/5 p-10'>
									<div className='bg-white rounded-lg inline-flex p-4'>{item.icon}</div>
									<p className='text-xl font-semibold mt-14'>{item.title}</p>
									<p className='mt-6 text leading-6 text-white/60'>{item.desc}</p>
								</div>
							))}
						</div>
					</section>

					<section className='w-full m-auto md:w-[100%] h-[500px] md:h-screen flex justify-center items-center py-12 bg-card rounded-2xl overflow-hidden'>
						<video
							className='object-cover object-center h-[60vh] w-full rounded-xl'
							autoPlay
							playsInline
							loop
							muted
							src='/videos/gidicruise.mp4'
							controls={false}
						/>
					</section>

					<section className='w-full flex flex-col justify-center items-center gap-12'>
						<div className='inline-flex justify-center flex-wrap items-center gap-4 py-2 px-6 rounded-full border border-primary'>
							<p className='text-[18px]'>Our Pricing</p>
							<ChevronRight className='text-primary' size={20} />
						</div>
						<h1 className='text-5xl md:text-7xl tracking-[-3px] mt-[-30px]'>Our Services</h1>
						<div className='w-full grid gap-8 lg:grid-cols-3'>
							{["Ticketing", "Guestlist", "Table bookings"].map((stat, index) => (
								<div key={stat} className='rounded-3xl border border-white/10 bg-white/5 p-8 text-center'>
									<p className={`text-4xl tracking-[-0.05em] font-medium text-white`}>{stat}</p>
									<p className='mt-3 text-xs uppercase text-white/60'>
										{index === 0 && "Increase in table sales"}
										{index === 1 && "Faster guest confirmation"}
										{index === 2 && "Average check-in time"}
									</p>
								</div>
							))}
						</div>
					</section>

					<section className='h-[80vh] items-center grid gap-10 rounded-3xl border-white/10 lg:grid-cols-[0.9fr_1.1fr]'>
						<div className=' items-start space-y-6'>
							<div className='inline-flex justify-center flex-wrap items-center gap-4 py-2 px-6 rounded-full border border-primary'>
								<p className='text-[18px]'>Frequently Asked Questions</p>
								<ChevronRight className='text-primary' size={20} />
							</div>
							<h2 className='text-7xl tracking-[-2px]'>Everything you need to know</h2>
							<p className='text-[18px] w-[80%] leading-6 text-white/70'>
								Get clear, straightforward answers to the most common questions about using Exa.
							</p>
							<div className='gap-1 mt-[30px] inline-flex px-4 flex-wrap items-center bg-white rounded-full justify-center text-black'>
								<div className='p-2 '>
									<Mail className='text-primary' size={20} />
								</div>{" "}
								hello@exa.com
							</div>
						</div>
						<div className='space-y-4'>
							{[
								"What is exa?",
								"How does it work?",
								"Who is exa for?",
								"How does exa work?",
								"how does pricing work?",
								"What is access control",
								"How do i use exa?",
							].map((step, index) => (
								<div key={step} className='border-b border-white/10 p-4'>
									<p className='text-lg font-medium'>{step}</p>
									<p className='mt-1 text-sm text-white/60 hidden'>
										{index === 0 && "Launch events, invitations, and ticket drops."}
										{index === 1 && "Keep waitlists, VIPs, and walk-ins synced."}
										{index === 2 && "Split commissions and export reports fast."}
									</p>
								</div>
							))}
						</div>
					</section>

					<section className='flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 text-center'>
						<p className=' text-white/60'>Ready to launch your next Event?</p>
						<h2 className='text-4xl font-medium'>EXA brings the energy. You run the room.</h2>
						<div className='flex flex-wrap items-center justify-center gap-4'>
							<Link href='/contact' className='rounded-md bg-white px-7 py-3 font-medium text-black'>
								Start a demo
							</Link>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</div>
	);
}
