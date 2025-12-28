"use client";
import { useEffect, useState } from "react";
import { getAbout } from "~/sanity/queries";
import Loading from "./loading";
import { SectionHeader } from "./section-header";

export function About() {
    const [aboutInfo, setAboutInfo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        getAbout()
            .then((html) => {
                if (!mounted) return;
                setAboutInfo(html);
            })
            .finally(() => mounted && setLoading(false));
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <section id="about" className="py-32 border-t border-border px-8">
            <div className="lg:ml-80">
                <SectionHeader title="About Me" />
                {loading ? <Loading message="Loading about me" /> : null}
                <div className="text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
                    {loading ? null : aboutInfo ? (
                        <div dangerouslySetInnerHTML={{ __html: aboutInfo }} />
                    ) : (
                        "No information available"
                    )}
                </div>
            </div>
        </section>
    );
}
