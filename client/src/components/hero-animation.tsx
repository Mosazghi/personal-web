"use client";

import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export function HeroAnimation({ name, titles }: { name: string; titles: string[] }) {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState(titles[0] ?? "");
    const [isDeleting, setIsDeleting] = useState(false);

    // biome-ignore lint/suspicious/noExplicitAny: Vanta ships no types
    const vantaEffectRef = useRef<any>(null);
    const vantaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!vantaRef.current) return;

        const loadScript = (src: string) =>
            new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });

        const loadVanta = async () => {
            try {
                if (!(window as any).THREE) {
                    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");
                }

                if (!(window as any).VANTA) {
                    await loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js");
                }

                if (!vantaEffectRef.current && vantaRef.current) {
                    vantaEffectRef.current = (window as any).VANTA.WAVES({
                        el: vantaRef.current,
                        THREE: (window as any).THREE,
                        mouseControls: false,
                        touchControls: false,
                        gyroControls: false,
                        minHeight: 200.0,
                        minWidth: 200.0,
                        scale: 1.0,
                        scaleMobile: 1.0,
                        color: 0x0,
                        shininess: 20.0,
                        waveHeight: 2,
                        waveSpeed: 2,
                        zoom: 1.23,
                    });
                }
            } catch (error) {
                console.error("Error loading Vanta:", error);
            }
        };

        loadVanta();

        return () => {
            if (vantaEffectRef.current) {
                vantaEffectRef.current.destroy();
                vantaEffectRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (titles.length === 0) return;

        const currentTitle = titles[currentTitleIndex] || "";
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
    }, [displayText, isDeleting, currentTitleIndex, titles]);

    return (
        <section className="min-h-screen w-screen flex items-center justify-center relative" ref={vantaRef}>
            <div className="flex flex-col justify-items-center h-full relative z-10 pointer-events-none">
                <Link href="#" className="text-sm text-muted-foreground mb-4 inline-block pointer-events-auto">
                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance text-white drop-shadow-md">
                        {name}
                    </h1>
                </Link>

                <div className="h-16 lg:h-20 mb-6 flex items-center">
                    <h2 className="text-3xl lg:text-4xl font-semibold text-balance bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient drop-shadow-sm">
                        {displayText}
                        <span aria-hidden="true" className="inline-block w-1 h-8 lg:h-10 ml-1 bg-accent animate-pulse">
                            |
                        </span>
                    </h2>
                </div>

                <div className="mt-20 self-center text-lg text-muted-foreground leading-relaxed text-balance pointer-events-auto">
                    <Button
                        onClick={() => {
                            document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        variant={"outline"}
                        aria-label="Scroll to work experience"
                    >
                        <ArrowDown className="block animate-bounce" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
