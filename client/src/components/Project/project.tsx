import { ImageOff, MoveRight } from "lucide-react";
import { useState } from "react";
export interface Project {
    id: number;
    name: string;
    description: string;
    showcaseLink: string;
    repositoryLink: string;
    previewLink: string;
    techStack: string[];
}

export interface ProjectProps {
    name: string;
    index: number;
    description: string;
    showcaseLink: string;
    repositoryLink: string;
    previewLink: string;
    isMobile?: boolean;
    techStack: string[];
}
export const Project = ({ name, index, isMobile, description, showcaseLink, previewLink, techStack }: ProjectProps) => {
    const split = showcaseLink.split("|");
    showcaseLink = !isMobile ? split[0] : split[1]; // mp4. | .gif
    const [mediaErr, setMediaErr] = useState(false);
    return (
        <div key={index} className="group grid lg:grid-cols-2 gap-8 items-center">
            <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="aspect-video rounded-lg overflow-hidden bg-card border border-border ">
                    {mediaErr ? (
                        <ImageOff className="size-12 mx-auto h-full text-muted-foreground" />
                    ) : isMobile ? (
                        <img
                            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                            src={showcaseLink}
                            alt={name}
                            onError={() => setMediaErr(true)}
                        />
                    ) : (
                        <video
                            className="hover:opacity-50 h-full w-full group-hover:scale-105 transition-transform duration-500"
                            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                            src={showcaseLink}
                            autoPlay
                            loop
                            muted
                            disablePictureInPicture
                            onError={() => setMediaErr(true)}
                        />
                    )}
                </div>
            </div>

            <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="text-2xl font-bold mb-4">{name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">{description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {" "}
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <a
                    href={previewLink}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all"
                    target="_blank"
                >
                    View Project
                    <MoveRight className="size-4" />
                </a>
            </div>
        </div>
    );
};
