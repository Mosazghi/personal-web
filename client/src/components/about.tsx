import { useEffect, useState } from "react";
import { apiFetch } from "~/utils/fetch";
import Loading from "./loading";
import { SectionHeader } from "./section-header";

export function About() {
    const [aboutInfo, setAboutInfo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: "GET",
            url: "https://api.npoint.io/7b57d163135f40a37a99",
        };
        setLoading(true);
        apiFetch(config)
            .then((response) => response)
            .then((data) => {
                setAboutInfo(data.text);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="about" className="py-32 border-t border-border ">
            <div className="lg:ml-80">
                <SectionHeader title="About Me" />
                {loading ? <Loading message="Loading about me" /> : null}
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
                    {aboutInfo ? <span dangerouslySetInnerHTML={{ __html: aboutInfo }} /> : "No information available"}
                </p>
            </div>
        </section>
    );
}
