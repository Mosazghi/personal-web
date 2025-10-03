import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { contactLinks } from "~/data";
import { Button } from "./ui/button";

const navItems = [
    { raw: "about", href: "#about", label: "About" },
    { raw: "experience", href: "#experience", label: "Experience" },
    { raw: "education", href: "#education", label: "Education" },
    { raw: "projects", href: "#projects", label: "Projects" },
    { raw: "skills", href: "#skills", label: "Skills" },
    { raw: "contact", href: "#contact", label: "Contact" },
];

export const Navigation = () => {
    const [activeSection, setActiveSection] = useState("about");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((item) => item.raw);
            const scrollPosition = window.scrollY + 200;
            const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

            if (isNearBottom) {
                setActiveSection(sections[sections.length - 1]);
                window.history.replaceState(null, "", `#${sections[sections.length - 1]}`);
                return;
            }

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop } = element;
                    if (scrollPosition >= offsetTop) {
                        setActiveSection(section);
                        window.history.replaceState(null, "", `#${section}`);
                        break;
                    }
                }
            }
        };

        handleScroll(); // Run on mount
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        console.log("element", element);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    return (
        <>
            <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col justify-between p-8 border-r border-border z-50">
                <div>
                    <ul className="space-y-3">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Button
                                    variant={"ghost"}
                                    onClick={() => scrollToSection(item.href)}
                                    className={`group flex items-center gap-3 py-0 transition-colors hover:bg-inherit ${
                                        activeSection === item.raw ? "text-foreground" : "text-muted-foreground"
                                    }`}
                                >
                                    <span
                                        className={`h-px transition-all ${
                                            activeSection === item.raw
                                                ? "w-16 bg-foreground"
                                                : "w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-foreground"
                                        }`}
                                    />
                                    <span className="text-xs font-medium uppercase tracking-wider">{item.label}</span>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-4">
                    {contactLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <link.Icon className="size-5" />
                        </a>
                    ))}
                </div>
            </nav>

            <nav className="lg:hidden fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-lg font-bold">Mosazghi Y. Tesfazghi</h1>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2"
                    >
                        {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </Button>
                </div>

                {mobileMenuOpen && (
                    <div className="border-t border-border bg-background">
                        <ul className="p-4 space-y-4">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <button
                                        onClick={() => scrollToSection(item.href)}
                                        className={`text-sm ${
                                            activeSection === item.raw ? "text-foreground" : "text-muted-foreground"
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </>
    );
};
