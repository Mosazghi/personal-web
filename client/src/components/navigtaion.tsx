"use client";
import { PopoverContent } from "@radix-ui/react-popover";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { contactLinks } from "~/data";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger } from "./ui/popover";

const sections = [
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
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-50% 0px -50% 0px",
                threshold: 0,
            }
        );

        sections.forEach(({ raw }) => {
            const element = document.getElementById(raw);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col justify-between p-8 border-r border-border z-50">
                <div>
                    <ul className="space-y-3">
                        {sections.map((item) => (
                            <li key={item.raw}>
                                <Button
                                    variant={"ghost"}
                                    onClick={() => scrollToSection(item.raw)}
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

                <div className="flex gap-8 justify-content-between items-center">
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

                    {/*Theme Logic  */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                                {theme === "light" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                            <div className="flex flex-col gap-2">
                                <Button
                                    variant={theme === "light" ? "default" : "ghost"}
                                    onClick={() => setTheme("light")}
                                    className="w-full justify-start"
                                >
                                    <Sun className="size-5" />
                                </Button>
                                <Button
                                    variant={theme === "dark" ? "default" : "ghost"}
                                    onClick={() => setTheme("dark")}
                                    className="w-full justify-start"
                                >
                                    <Moon className="size-5" />
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </nav>

            <nav className="lg:hidden fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-lg font-bold">Mosazghi Y. Tesfazghi</h1>
                    <div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    {theme === "light" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                                <div className="flex flex-col gap-2">
                                    <Button
                                        variant={theme === "light" ? "default" : "ghost"}
                                        onClick={() => setTheme("light")}
                                        className="w-full justify-start"
                                    >
                                        <Sun className="size-5" />
                                    </Button>
                                    <Button
                                        variant={theme === "dark" ? "default" : "ghost"}
                                        onClick={() => setTheme("dark")}
                                        className="w-full justify-start"
                                    >
                                        <Moon className="size-5" />
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2"
                        >
                            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </Button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="border-t border-border bg-background">
                        <ul className="p-4 space-y-4">
                            {sections.map((item) => (
                                <li key={item.raw}>
                                    <button
                                        onClick={() => scrollToSection(item.raw)}
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
