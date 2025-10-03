import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { request } from "../../utils/fetch";
import isMobileDevice from "../../utils/isMobileDevice";

export interface ProjectProps {
    name: string;
    description: string;
    showcaseLink: string;
    repositoryLink: string;
    previewLink: string;
    techStack: string[];
}

const Project = ({ name, description, showcaseLink, techStack, previewLink, repositoryLink }: ProjectProps) => {
    const [techLogos, setTechLogos] = useState<Record<string, string>>({});
    const isMobile = isMobileDevice();
    const split = showcaseLink.split("|");
    showcaseLink = !isMobile ? split[0] : split[1]; // mp4. | .gif

    useEffect(() => {
        const config = {
            method: "GET",
            url: "https://api.npoint.io/961a5a6ec930fb9da6f8",
        };
        request(config)
            .then((response) => response)
            .then((data) => setTechLogos(data));
    }, []);

    return (
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <button className="w-full bg-black hover:bg-black" onClick={() => window.open(previewLink)}>
                {isMobile ? (
                    <img
                        className="hover:opacity-50 w-full"
                        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                        src={showcaseLink}
                        alt={name}
                    />
                ) : (
                    <video
                        className="hover:opacity-50 max-h-[350px] w-full"
                        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                        src={showcaseLink}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                )}
            </button>
            <div className="pt-1 px-4 pb-2">
                <div className="flex flex-row items-center">
                    <h5 className="text-2xl font-medium mb-0">{name}</h5>
                    <a
                        href={repositoryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="open repository"
                        className="p-2 rounded-full hover:bg-gray-100"
                        title="View on GitHub"
                    >
                        <ArrowUpRight className="h-6 w-6 text-black" />
                    </a>
                </div>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="px-4 pb-2">
                <div className="flex px-1 gap-1 flex-row">
                    {techStack.map((tech, i) => (
                        <span key={i} className="flex items-center gap-0.5" title={tech}>
                            <img src={techLogos[tech]} alt={tech} className="h-[21px] w-[21px]" />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Project;
