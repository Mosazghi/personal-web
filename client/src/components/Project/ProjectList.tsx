import { useEffect, useState } from "react";
import { request } from "../../utils/fetch";
import getApiPath from "../../utils/getApiPath";
import LoadingStatus from "../LoadingStatus";
import Project, { ProjectProps } from "./Project";

const NoProjects = () => {
    return (
        <p className="text-center text-[1.2rem] md:text-[1.6rem] text-blue-gray-200">
            Coming soon... In the meantime check out my{" "}
            <a href="https://github.com/Mosazghi" className="underline text-white hover:no-underline">
                github account
            </a>
        </p>
    );
};

const ProjectList = () => {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [loading, setLoading] = useState(true);
    console.log("url", getApiPath() + import.meta.env.VITE_PROJECTS_URL);

    useEffect(() => {
        const config = {
            method: "GET",
            url: getApiPath() + import.meta.env.VITE_PROJECTS_URL,
        };

        setLoading(true);
        request(config)
            .then((response) => response)
            .then((data) => {
                setProjects(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingStatus message="Loading projects" />;
    }

    if (projects.length === 0) {
        return <NoProjects />;
    }

    return (
        <section className="py-3 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 items-start justify-center">
                {projects.length > 0 ? (
                    projects.map((project, index: number) => (
                        <article key={index} className="w-full">
                            <Project {...project} />
                        </article>
                    ))
                ) : (
                    <p>No featured projects at this time. </p>
                )}
            </div>
        </section>
    );
};

export default ProjectList;
