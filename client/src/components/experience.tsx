import { SectionHeader } from "./section-header";

export function Experience() {
    const experiences = [
        {
            period: "2024 — Present",
            title: "Software Developer",
            company: "Langø Service",
            description:
                "Working with truck-braketester software using Rust, TypeScript and WebSocket. Maintaining full-stack web application using React and Django.",
            technologies: ["Rust", "TypeScript", "WebSocket", "React", "Django"],
        },
        {
            period: "Summer 2025",
            title: "Software Developer Intern",
            company: "Blueye Robotics",
            description: "Working primarily on the control system and operating system running on underwater drones.",
            technologies: ["C++", "Linux", "Embedded Systems", "Control Systems", "Robotics"],
        },
        {
            period: "2023 — 2024",
            title: "IT Lead",
            company: "Start Gjøvik",
            description:
                "Led a team of four developers, contributing to web projects. Managed a complete re-design of the company website, enhancing user experience and visual appeal.",
            technologies: ["Team Leadership", "Web Development", "Project Management"],
        },
    ];

    return (
        <section id="experience" className="py-32 border-t border-border px-8">
            <div className="lg:ml-80 space-y-12">
                <SectionHeader title="Work Experience" />
                {experiences.map((exp, index) => (
                    <div key={index} className="group">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="md:w-48 flex-shrink-0">
                                <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                                    {exp.period}
                                </p>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {exp.title} · <span className="text-muted-foreground">{exp.company}</span>
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-4 text-pretty max-w-[70%]">
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
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
