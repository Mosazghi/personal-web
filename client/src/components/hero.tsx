"use client";

import { cn } from "~/lib/cn-merge";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const titles = [
    "Software Developer",
    "Electronics Engineer",
    "Master's Student in Cybernetics & Robotics",
    "Embedded Systems Enthusiast",
] as const;

export function Hero() {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const vantaEffectRef = useRef<any>(null);
    const vantaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!vantaRef.current) return;

        const loadVanta = async () => {
            try {
                // Load THREE.js from CDN
                if (!(window as any).THREE) {
                    await new Promise((resolve, reject) => {
                        const script = document.createElement("script");
                        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });
                }

                // Load Vanta Waves from CDN
                if (!(window as any).VANTA) {
                    await new Promise((resolve, reject) => {
                        const script = document.createElement("script");
                        script.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js";
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });
                }

                // Initialize Vanta effect
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
                        waveHeight: 1.5,
                        waveSpeed: 1.3,
                        zoom: 1.23,
                    });
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error loading Vanta:", error);
                setIsLoading(false);
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
        <section className="min-h-screen  w-screen flex items-center justify-center relative" ref={vantaRef}>
            <div className="flex flex-col justify-items-center h-full relative z-10 pointer-events-none">
                <Link
                    href="/admin/login"
                    className="text-sm text-muted-foreground mb-4 inline-block pointer-events-auto"
                >
                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance text-white drop-shadow-md">
                        Mosazghi Y. Tesfazghi
                    </h1>
                </Link>

                <div className="h-16 lg:h-20 mb-6 flex items-center">
                    <h2 className="text-3xl lg:text-4xl font-semibold text-balance bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient drop-shadow-sm">
                        {displayText}
                        <span className="inline-block w-1 h-8 lg:h-10 ml-1 bg-accent animate-pulse">|</span>
                    </h2>
                </div>

                <div className="mt-20 self-center text-lg text-muted-foreground leading-relaxed text-balance pointer-events-auto">
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
