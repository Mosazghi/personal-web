import { SectionHeader } from "./section-header";

export function Education() {
    const education = [
        {
            period: "2025 — 2027",
            title: "MSc in Cybernetics and Robotics",
            company: "Norwegian University of Science and Technology (NTNU)",
            description:
                "Focusing on robotics, control systems, and embedded software. Building strong foundations in both low-level and high-level system design.",
            technologies: ["Robotics", "Control Systems", "Embedded Systems", "Machine Learning", "C/C++"],
        },
        {
            period: "2022 — 2025",
            title: "BSc in Electronics Engineering",
            company: "Norwegian University of Science and Technology (NTNU)",
            description:
                "Specialized in electronics, embedded systems, and programming. Gained hands-on experience with microcontrollers and signal processing.",
            technologies: ["Electronics", "Microcontrollers", "Signal Processing", "C/C++"],
        },
    ];

    return (
        <section id="education" className="py-32 border-t border-border">
            <div className="lg:ml-80 space-y-12">
                <SectionHeader title="Education" />
                {education.map((edu, index) => (
                    <div key={index} className="group">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="md:w-48 flex-shrink-0">
                                <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                                    {edu.period}
                                </p>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {edu.title} · <span className="text-muted-foreground">{edu.company}</span>
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-4 text-pretty max-w-[70%]">
                                    {edu.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {edu.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
