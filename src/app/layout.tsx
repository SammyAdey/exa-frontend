import type { Metadata } from "next";
import { Darker_Grotesque, Manrope } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const darkerGrotesque = Darker_Grotesque({
	subsets: ["latin"],
	variable: "--font-darker-grotesque",
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
	weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "EXA",
	description: "Exhibit Access Control",
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${darkerGrotesque.variable} ${manrope.variable} ${GeistMono.variable}`}>
			<body className={`${manrope.className} antialiased`}>{children}</body>
		</html>
	);
}
