import { About } from "~/components/about";
import { Contact } from "~/components/contact";
import { Education } from "~/components/education";
import { Experience } from "~/components/experience";
import { Hero } from "~/components/hero";
import { Navigation } from "~/components/navigtaion";
import ProjectList from "~/components/Project/project-list";
import { Skills } from "~/components/skills";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main>
                <Hero />
                <About />
                <Experience />
                <Education />
                <ProjectList />
                <Skills />
                <Contact />
            </main>
        </div>
    );
}
