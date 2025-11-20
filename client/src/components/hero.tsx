"use client";

import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const titles = [
    "Software Developer",
    "Electronics Engineer",
    "Master’s Student in Cybernetics & Robotics",
    "Embedded Systems Enthusiast",
] as const;

export function Hero() {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentTitle = titles[currentTitleIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseTime = isDeleting ? 500 : 2000;

        const timeout = setTimeout(() => {
            if (!isDeleting && displayText === currentTitle) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
            } else {
                setDisplayText(
                    isDeleting
                        ? currentTitle.substring(0, displayText.length - 1)
                        : currentTitle.substring(0, displayText.length + 1)
                );
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentTitleIndex]);

    return (
        <section className="min-h-screen flex items-center justify-center lg:ml-80 px-6 lg:px-12">
            <div className="flex flex-col justify-items-center h-full">
                <Link href="/admin/login" className="text-sm text-muted-foreground mb-4 inline-block">
                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance">Mosazghi Y. Tesfazghi</h1>
                </Link>

                <div className="h-16 lg:h-20 mb-6 flex items-center">
                    <h2 className="text-3xl lg:text-4xl font-semibold text-balance bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">
                        {displayText}
                        <span className="inline-block w-1 h-8 lg:h-10 ml-1 bg-accent animate-pulse">|</span>
                    </h2>
                </div>

                <div className="mt-20 self-center text-lg text-muted-foreground leading-relaxed text-balance">
                    <Button
                        onClick={() => {
                            const experienceSection = document.getElementById("experience");
                            if (experienceSection) {
                                experienceSection.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        variant={"outline"}
                    >
                        <ArrowDown className="block animate-bounce" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
