import { SectionHeader } from "./section-header";

export function Skills() {
    const skills = [
        "C++",
        "Rust",
        "Python",
        "TypeScript",
        "JavaScript",
        "React",
        "Django",
        "Qt",
        "C#/.NET",
        "MSSQL",
        "Postgres",
        "Linux",
        "Embedded Systems",
        "Control Systems",
        "Robotics",
        "Electronics",
        "Docker",
        "Azure",
        "CI/CD",
        "WebSockets",
        "Modbus",
        "ESP32",
        "STM32",
        "FreeRTOS",
        "ROS",
        "MQTT",
        "Boost",
        "Boost.Asio",
        "Team Leadership",
        "Project Management",
    ];

    return (
        <section id="skills" className="py-32 border-t border-border">
            <div className="lg:ml-80 space-y-12">
                <SectionHeader title="Skills" />
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
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
