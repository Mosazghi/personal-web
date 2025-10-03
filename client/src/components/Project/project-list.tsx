import { ArrowUpRightSquare } from "lucide-react";
import { useEffect, useState } from "react";
import isMobileDevice from "~/utils/isMobileDevice";
import { apiFetch } from "../../utils/fetch";
import getApiPath from "../../utils/getApiPath";
import Loading from "../loading";
import { SectionHeader } from "../section-header";
import { Project, ProjectProps } from "./project";

const NoProjects = () => {
    return (
        <p className="text-center">
            No projects available. Please visit my{" "}
            <a href="https://github.com/Mosazghi" className="underline hover:no-underline">
                github account
                <ArrowUpRightSquare className="inline-block mb-1 mx-1" />
            </a>{" "}
            instead
        </p>
    );
};

const ProjectList = () => {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [loading, setLoading] = useState(true);
    console.log("url", getApiPath() + import.meta.env.VITE_PROJECTS_URL);

    const isMobile = isMobileDevice();

    useEffect(() => {
        const config = {
            method: "GET",
            url: getApiPath() + import.meta.env.VITE_PROJECTS_URL,
        };

        setLoading(true);
        apiFetch(config)
            .then((response) => response)
            .then((data) => {
                setProjects(data);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loading message="Loading projects" />;
    }

    return (
        <section id="projects" className="py-32 border-t border-border">
            <div className="lg:ml-80 grid gap-12">
                <SectionHeader title="Featured Projects" />
                {projects.length === 0 && <NoProjects />}
                {projects.length > 0 &&
                    projects.map((project, index) => (
                        <Project {...project} index={index} isMobile={isMobile} key={project.name} />
                    ))}
            </div>
        </section>
    );
};

export default ProjectList;
