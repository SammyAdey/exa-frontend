import { Calendar, CheckCheck, ChevronRight, DollarSign, LogIn, Mail, Table2, Ticket, User } from "lucide-react";
import Link from "next/link";
import FeaturesBenefits from "../../components/features-benefits";
import AccessFeatureSection from "../../components/access-feature-section";
import FaqAccordion from "../../components/faq-accordion";
import Image from "next/image";

export default function Home() {
	return (
		<div className='min-h-screen bg-[#0b0b0c] text-white'>
			<div className='mx-auto flex flex-col'>
				<section className='relative flex w-full flex-col items-center justify-center gap-12 bg-[#0b0b0c] pb-16'>
					{/* Background glow — z-0 sits above section bg, content sits at z-10 */}
					<div className='min-h-[80vh] pointer-events-none absolute inset-0 top-1/3 z-0'>
						<div className='absolute left-0 top-1/2 h-[15vh] z-1 w-screen rounded-full bg-[#F3EFE3] blur-[120px]' />
						<div className='absolute inset-0 bg-gradient-to-b from-[#0b0b0c] via-[#9E00FF] to-[#0b0b0c]' />
					</div>

					<div className='relative z-10 h-[7vh] w-full' />
					<div className='relative z-10 flex w-[80%] flex-col items-center justify-center gap-8'>
						<div className='inline-flex w-fit items-center gap-2 rounded-full border border-primary/70 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white'>
							<p className='text-[12px]'>Guest management, ticketing, and access control</p>
							<ChevronRight size={14} aria-hidden='true' />
						</div>
						<h1 className='text-6xl w-[50%] font-semibold text-center leading-[0.7em] mt-[-20px] tracking-tight sm:text-4xl lg:text-7xl'>
							The event <span className='text-primary'>platform</span> built for everything.
						</h1>
						<p className='w-full hidden text-center text-base text-white/70 sm:text-lg'>
							EXA brings guest lists, table bookings, ticketing, and real-time insights into one sleek workspace. Launch events faster, fill venues
							smarter, and track every guest touchpoint.
						</p>
						<div className='hidden flex flex-wrap gap-4 mt-[20px]'>
							<Link href='https://cal.com/arcxne/1-hour-meeting'>
								<button className='rounded-[4px] flex items-center justify-center bg-white px-7 py-3 text-sm font-semibold uppercase text-black hover:text-white duration-300 hover:bg-primary cursor-pointer'>
									<Calendar className='mr-2' size={20} /> Book a demo
								</button>
							</Link>
						</div>
						<div className='h-[7vh] w-screen' />
						<div className='relative w-full max-w-[1200px] overflow-hidden rounded-4xl p-[2px] shadow-[0_0_80px_-20px_rgba(158,0,255,0.45)]'>
							<div className='pointer-events-none absolute inset-0 overflow-hidden rounded-4xl' aria-hidden='true'>
								<div className='animated-border-beam absolute left-1/2 top-1/2 aspect-square w-[200%] bg-[conic-gradient(from_0deg,transparent_60%,rgba(158,0,255,0.2)_70%,#9E00FF_80%,#c084fc_88%,transparent_96%)]' />
							</div>
							<div className='relative overflow-hidden rounded-[1.875rem] border-2 border-white/20 bg-[#0b0b0c]'>
								<Image src='/images/dashboard-v2.png' alt='dashboard' width={1200} height={800} className='block h-auto w-full' />
							</div>
						</div>
					</div>
				</section>

				<div className='h-[20vh] w-screen' />
				<AccessFeatureSection />

				<div className='h-[30vh] w-screen' />
				<section className='w-[80%] m-auto grid gap-6 rounded-3xl'>
					<div className='grid gap-7 md:grid-cols-3 px-12'>
						{[
							{
								icon: <LogIn className='text-[#C3A8FF]' size={56} strokeWidth={1.25} />,
								title: "Instant check-in",
								desc: "QR scanning, smart waitlists, and priority flows keep the line moving.",
							},
							{
								icon: <Ticket className='text-[#C3A8FF]' size={56} strokeWidth={1.25} />,
								title: "Ticketing",
								desc: "Capture preferences, spend history, and VIP notes with every visit.",
							},
							{
								icon: <DollarSign className='text-[#C3A8FF]' size={56} strokeWidth={1.25} />,
								title: "Revenue control",
								desc: "Track bottle service, promoter splits, and nightly reports in one view.",
							},
							{
								icon: <Calendar className='text-[#C3A8FF]' size={56} strokeWidth={1.25} />,
								title: "RSVPs",
								desc: "Track bottle service, promoter splits, and nightly reports in one view.",
							},
							{
								icon: <User className='text-[#C3A8FF]' size={56} strokeWidth={1.25} />,
								title: "Guest List Management",
								desc: "Capture preferences, spend history, and VIP notes with every visit.",
							},
							{
								icon: <Table2 className='text-[#C3A8FF]' size={56} strokeWidth={1.25} />,
								title: "Table bookings",
								desc: "Track bottle service, promoter splits, and nightly reports in one view.",
							},
						].map((item) => (
							<div key={item.title} className='rounded-2xl border border-white/[0.08] bg-[#111113] p-8 sm:p-10'>
								<div className='inline-flex text-[#C3A8FF]'>{item.icon}</div>
								<p className='text-xl font-semibold mt-14'>{item.title}</p>
								<p className='mt-6 text leading-6 text-white/60'>{item.desc}</p>
							</div>
						))}
					</div>
				</section>

				<div className='h-[20vh] w-screen' />
				<FeaturesBenefits />

				{/* <section className='w-full m-auto md:w-[100%] h-[500px] md:h-screen flex justify-center items-center py-12 bg-card rounded-2xl overflow-hidden'>
					<video
						className='object-cover object-center h-[60vh] w-full rounded-xl'
						autoPlay
						playsInline
						loop
						muted
						src='/videos/gidicruise.mp4'
						controls={false}
					/>
				</section> */}

				<div className='h-[20vh] w-screen' />
				<section className='w-[80%] px-12 m-auto flex flex-col justify-center items-center gap-12'>
					<div className='inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white'>
						Our Pricing
						<ChevronRight size={14} aria-hidden='true' />
					</div>
					<h1 className='text-5xl font-medium md:text-6xl tracking-tighter mt-[-30px]'>Pricing for controlled access events</h1>
					<div className='w-full grid gap-8 lg:grid-cols-2'>
						<div className='rounded-3xl border border-white/10 bg-gradient-to-b from-[#C3A8FF] to-white p-12'>
							<div className=' font-mono font-medium px-8 py-1 bg-[#FFF546] rounded-full border-2 border-black text-black inline-flex items-center gap-2'>
								Best Seller
							</div>

							<p className='text-[90px] tracking-tighter font-medium text-black'>XP</p>
							<p className='font-medium font-mono text-black'>Secure invitations & guest verification</p>
							<div className='h-[1px] w-full bg-black my-6' />
							<div className='text-black text-sm font-semibold flex flex-col gap-6'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2'>
										<CheckCheck className='text-[#90B533]' size={20} />
										<p>Personalised e-invitations & access cards with QR</p>
									</div>
									<p>₦550 / guest</p>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2'>
										<CheckCheck className='text-[#90B533]' size={20} />
										<p>WhatsApp or email QR distribution</p>
									</div>
									<p>₦550 / guest</p>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2'>
										<CheckCheck className='text-[#90B533]' size={20} />
										<p>Onsite service staff</p>
									</div>
									<p>₦25,000 / staff</p>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2'>
										<CheckCheck className='text-[#90B533]' size={20} />
										<p>Authentication tags (wristbands/cards )</p>
									</div>
									<p>₦150 / tag</p>
								</div>
							</div>
						</div>
						<div className='rounded-3xl border-2 border-white/10 bg-white/5 p-12'>
							<div className=' font-mono font-medium px-8 py-1 bg-[#C3A8FF] rounded-full border-2 border-black text-black inline-flex items-center gap-2'>
								Reccomended
							</div>

							<p className='text-[90px] tracking-tighter font-medium text-white'>XP+</p>
							<p className='font-medium font-mono text-white'>Everything in XP, plus post-event engagement</p>
							<div className='h-[1px] w-full bg-white my-6' />
							<div className='text-white text-sm font-semibold flex flex-col gap-6'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2'>
										<CheckCheck className='text-[#90B533]' size={20} />
										<p>Post-event thank you message</p>
									</div>
									<p>₦150 / guest</p>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2'>
										<CheckCheck className='text-[#90B533]' size={20} />
										<p>Custom landing page</p>
									</div>
									<p>Qouted after Assesment</p>
								</div>
							</div>
						</div>
					</div>
					<div></div>
				</section>
				<div className='h-[25vh] w-screen' />
				<section className='w-[80%] px-12 m-auto items-center grid gap-10 rounded-3xl border-white/10 lg:grid-cols-[0.9fr_1.1fr]'>
					<div className=' items-start space-y-6'>
						<div className='inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white'>
							Frequently Asked Questions
							<ChevronRight size={14} aria-hidden='true' />
						</div>
						<h2 className='text-7xl font-medium tracking-[-2px]'>Everything you need to know</h2>
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
					<FaqAccordion />
				</section>
				<div className='h-[25vh] w-screen' />

				<section className='w-[80%] m-auto flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 text-center'>
					<p className=' text-white/60'>Ready to launch your next Event?</p>
					<h2 className='text-4xl font-medium'>EXA brings the energy. You run the room.</h2>
					<div className='flex flex-wrap items-center justify-center gap-4'>
						<Link href='/contact' className='rounded-md bg-white px-7 py-3 font-medium text-black'>
							Start a demo
						</Link>
					</div>
				</section>
				<div className='h-[15vh] w-screen' />
			</div>
		</div>
	);
}
