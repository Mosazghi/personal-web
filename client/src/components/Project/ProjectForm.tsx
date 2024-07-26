import { useState, useEffect, FormEvent } from "react";
import { Box, TextField } from "@mui/material";
import getApiPath from "../../utils/getApiPath";
import Button from "../Button";
import cookies from "../../utils/cookies";
import TechStackInput from "./TechStackInput";
import { ProjectProps } from "./Project";
import { request } from "../../utils/fetch";
import noChangesMade from "../../utils/noChangesMade";
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                label="Project name"
                name="name"
                sx={{ mt: 1 }}
                value={formData.name}
                onChange={handleChange}
                required
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
            />
            <TextField
                label="Repository link"
                name="repositoryLink"
                value={formData.repositoryLink}
                onChange={handleChange}
                required
            />
            <TextField
                label="Preview link"
                name="previewLink"
                value={formData.previewLink}
                onChange={handleChange}
                required
            />
            <TextField
                label="Showcase link"
                name="showcaseLink"
                value={formData.showcaseLink}
                onChange={handleChange}
                required
            />
            <TechStackInput
                techStacks={formData.techStack}
                setTechStacks={(newTechStack: string[]) => setFormData({ ...formData, techStack: newTechStack })}
            />
            <Button disabled={noChangesMade(project, formData)} type="submit" text={project ? "Update Project" : "Create New Project"} />
        </Box>
    );
}
