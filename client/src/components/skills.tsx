"use client";
import { useEffect, useState } from "react";
import { getSkills } from "~/sanity/queries";
import { SectionHeader } from "./section-header";

export function Skills() {
    const [skills, setSkills] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        getSkills().then((data) => {
            if (!mounted) return;
            setSkills((data || []).map((d: any) => d.name));
            setLoading(false);
        });
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <section id="skills" className="py-32 border-t border-border px-8">
            <div className="lg:ml-80 space-y-12">
                <SectionHeader title="Skills" />
                <div className="flex flex-wrap gap-3">
                    {loading
                        ? null
                        : skills.map((skill) => (
                              <span
                                  key={skill}
                                  className="bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:bg-primary/20 transition-colors transform hover:scale-110 duration-200"
                              >
                                  {skill}
                              </span>
                          ))}
                </div>
            </div>
        </section>
    );
}
