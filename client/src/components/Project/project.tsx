import { ImageOff, MoveRight } from "lucide-react";
import { useState } from "react";
export interface Project {
    id: number;
    name: string;
    description: string;
    showcaseLinkMp4: string;
    showcaseLinkGif: string;
    repositoryLink: string;
    previewLink: string;
    startDate: string;
    endDate?: string;
    techStack: string[];
}

export interface ProjectProps {
    name: string;
    index: number;
    description: string;
    showcaseLinkMp4: string;
    showcaseLinkGif: string;
    repositoryLink: string;
    previewLink: string;
    isMobile?: boolean;
    startDate: string;
    endDate?: string;
    techStack: string[];
}
export const Project = ({
    name,
    index,
    isMobile,
    description,
    showcaseLinkMp4,
    showcaseLinkGif,
    previewLink,
    techStack,
    startDate,
    endDate,
}: ProjectProps) => {
    const [mediaErr, setMediaErr] = useState(false);
    return (
        <div key={index} className="group grid lg:grid-cols-2 gap-8 items-center">
            <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="aspect-video rounded-lg overflow-hidden bg-card border border-border ">
                    {mediaErr ? (
                        <ImageOff className="size-12 mx-auto h-full text-muted-foreground" />
                    ) : isMobile || showcaseLinkGif.endsWith(".png") || showcaseLinkGif.endsWith(".jpg") ? (
                        <img
                            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                            src={showcaseLinkGif}
                            alt={name}
                            onError={() => setMediaErr(true)}
                        />
                    ) : (
                        <video
                            className="hover:opacity-50 h-full w-full group-hover:scale-105 transition-transform duration-500"
                            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                            src={showcaseLinkMp4}
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
                <div className="flex items-center gap-2 mb-2 justify-between flex-wrap">
                    <h3 className="text-2xl font-bold mb-4">{name}</h3>
                    <div className="items-center gap-4 mb-4 flex opacity-0 group-hover:opacity-100 transition-opacity transform  duration-500 ease-out">
                        <span className="text-[11px] font-mono text-muted-foreground">
                            {new Date(startDate).toLocaleDateString()} -{" "}
                            {endDate ? new Date(endDate).toLocaleDateString() : "Present"}
                        </span>
                    </div>
                </div>
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
                    className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 opacity-0 group-hover:opacity-100 transition-opacity transform  duration-500 ease-out"
                    target="_blank"
                >
                    View Project
                    <MoveRight className="size-4" />
                </a>
            </div>
        </div>
    );
};
