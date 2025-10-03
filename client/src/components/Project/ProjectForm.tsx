import { FormEvent, useEffect, useState } from "react";
import cookies from "../../utils/cookies";
import { request } from "../../utils/fetch";
import getApiPath from "../../utils/getApiPath";
import noChangesMade from "../../utils/noChangesMade";
import Button from "../Button";
import { ProjectProps } from "./Project";
import TechStackInput from "./TechStackInput";
export interface Project {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    id: number;
    name: string;
    description: string;
    showcaseLink: string;
    repositoryLink: string;
    previewLink: string;
    techStack: string[];
}

interface ProjectFormProps {
    onSuccess: () => void;
    onError: (message: string) => void;
    project?: Project | null;
}
const defaultProject = {
    name: "",
    description: "",
    showcaseLink: "",
    repositoryLink: "",
    previewLink: "",
    techStack: [],
};
export default function CreateProjectForm({ onSuccess, onError, project }: ProjectFormProps) {
    const [formData, setFormData] = useState<ProjectProps>(defaultProject);

    useEffect(() => {
        if (project) {
            setFormData(project);
        }
    }, [project]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (project && JSON.stringify(project) === JSON.stringify(formData)) {
            alert("No changes were made.");
            return;
        }

        const config = {
            method: project ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.get("TOKEN")}`,
            },
            url: getApiPath() + import.meta.env.VITE_PROJECTS_URL + (project ? `/${project.id}` : ""),
            data: formData,
        };

        try {
            const data = await request(config);

            if (data) {
                onSuccess();
                if (!project) {
                    setFormData(defaultProject);
                }
            } else {
                onError(`Error submitting form:\n${data.errors[Object.keys(data.errors)[0]]}`);
            }
        } catch (e) {
            onError(`Error submitting form. Check if all fields are reasonable.`);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium">
                    Project name
                </label>
                <input
                    id="name"
                    name="name"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm font-medium">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="repositoryLink" className="text-sm font-medium">
                    Repository link
                </label>
                <input
                    id="repositoryLink"
                    name="repositoryLink"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.repositoryLink}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="previewLink" className="text-sm font-medium">
                    Preview link
                </label>
                <input
                    id="previewLink"
                    name="previewLink"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.previewLink}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="showcaseLink" className="text-sm font-medium">
                    Showcase link
                </label>
                <input
                    id="showcaseLink"
                    name="showcaseLink"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.showcaseLink}
                    onChange={handleChange}
                    required
                />
            </div>
            <TechStackInput
                techStacks={formData.techStack}
                setTechStacks={(newTechStack: string[]) => setFormData({ ...formData, techStack: newTechStack })}
            />
            <Button
                disabled={noChangesMade(project, formData)}
                type="submit"
                text={project ? "Update Project" : "Create New Project"}
            />
        </form>
    );
}
