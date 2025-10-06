import { ArrowUpRightSquare } from "lucide-react";
import { useEffect, useState } from "react";
import isMobileDevice from "~/utils/isMobileDevice";
import { apiFetch } from "../../utils/fetch";
import getApiPath from "../../utils/getApiPath";
import { SectionHeader } from "../section-header";
import { Project, ProjectProps } from "./project";
import { Skeleton } from "../ui/skeleton";

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

    return (
        <section id="projects" className="py-32 border-t border-border">
            <div className="lg:ml-80 grid gap-12">
                <SectionHeader title="Featured Projects" />
                {loading &&
                    Array.from({ length: 3 }).map((_, index) => <LoadingProjectsSkeleton index={index} key={index} />)}
                {projects.length === 0 && <NoProjects />}
                {projects.length > 0 &&
                    projects
                        .reverse()
                        .map((project, index) => (
                            <Project {...project} index={index} isMobile={isMobile} key={project.name} />
                        ))}
            </div>
        </section>
    );
};

const LoadingProjectsSkeleton = ({ index }: { index: number }) => {
    return (
        <div key={index} className="group grid lg:grid-cols-2 gap-8 items-center">
            <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Skeleton className="w-full h-[280px] rounded-xl" />
            </div>

            <div className={`${index % 2 === 1 ? "lg:order-1" : ""} space-y-4`}>
                <Skeleton className="h-[40px] w-20 rounded-xl" />
                <Skeleton className="h-[80px] w-full rounded-xl" />
                <Skeleton className="h-[28px] w-40 rounded-xl" />
                <Skeleton className="h-[17px] w-40 rounded-xl" />
            </div>
        </div>
    );
};

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

export default ProjectList;
