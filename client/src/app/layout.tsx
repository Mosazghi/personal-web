import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "Mosazghi Yohannes Tesfazghi | Electrical Engineering Student & Software Developer",
        template: "%s | Mosazghi Tesfazghi",
    },
    description:
        "Portfolio of Mosazghi Yohannes Tesfazghi, an Electrical Engineering student at NTNU specializing in software development, web applications, and electronics. Explore my projects, skills, and experience.",
    keywords: [
        "Mosazghi Yohannes Tesfazghi",
        "Electrical Engineering",
        "NTNU",
        "Software Developer",
        "Web Development",
        "React",
        "TypeScript",
        "Next.js",
        "Full Stack Developer",
        "Electronics",
        "Portfolio",
        "Norway",
        "Trondheim",
    ],
    authors: [{ name: "Mosazghi Yohannes Tesfazghi" }],
    creator: "Mosazghi Yohannes Tesfazghi",
    publisher: "Mosazghi Yohannes Tesfazghi",
    metadataBase: new URL("https://portfolio.mostes.no"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://portfolio.mostes.no",
        siteName: "Mosazghi Tesfazghi Portfolio",
        title: "Mosazghi Yohannes Tesfazghi | Electrical Engineering Student & Software Developer",
        description:
            "Portfolio of Mosazghi Yohannes Tesfazghi, an Electrical Engineering student at NTNU specializing in software development, web applications, and electronics. Explore my projects, skills, and experience.",
        images: [
            {
                url: "/profile-icon.png",
                width: 1200,
                height: 630,
                alt: "Mosazghi Yohannes Tesfazghi Portfolio",
            },
        ],
    },
    icons: {
        icon: "/profile-icon.png",
        shortcut: "/profile-icon.png",
        apple: "/profile-icon.png",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
