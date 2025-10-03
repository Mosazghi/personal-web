import { contactLinks } from "~/data";
import { SectionHeader } from "./section-header";

export function Contact() {
    return (
        <section id="contact" className="py-32 border-t border-border ">
            <div className="lg:ml-80">
                <SectionHeader title="Contact" />
                <div className="max-w-3xl">
                    <p className="text-2xl leading-relaxed mb-12 text-pretty">
                        If you would like to discuss a project or just say hi, I'm always down to chat.
                    </p>

                    <button className="text-sm border border-border px-6 py-3 rounded-md hover:bg-accent transition-colors">
                        <a href="mailto:mosazghiyohannes@gmail.com" className="hover:text-foreground transition-colors">
                            Contact
                        </a>
                    </button>

                    <div className="mt-16 pt-16 border-t border-border">
                        <div className="flex flex-row gap-4 text-sm text-muted-foreground">
                            {contactLinks.map((link) => (
                                <a key={link.name} href={link.url} className="hover:text-foreground transition-colors">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
