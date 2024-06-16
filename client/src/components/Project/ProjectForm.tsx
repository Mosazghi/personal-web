import { useState, useEffect, FormEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import getApiPath from "../../utils/getApiPath";
import cookies from "../../utils/cookies";
interface Project {
    id: number;
    name: string;
    description: string;
    link: string;
    technology: string;
}

interface ProjectFormProps {
    onSuccess: () => void;
    onError: (message: string) => void;
    project?: Project | null;
}

const CreateProjectForm: React.FC<ProjectFormProps> = ({ onSuccess, onError, project }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        link: "",
        technology: "",
    });

    useEffect(() => {
        if (project) {
            setFormData(project);
        }
    }, [project]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const apiUrl = getApiPath();

        try {
            const response = await fetch(apiUrl, {
                method: project ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.get("TOKEN")}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                onSuccess();
                if (!project) {
                    setFormData({
                        name: "",
                        description: "",
                        link: "",
                        technology: "",
                    });
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
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
            />
            <TextField label="Link" name="link" value={formData.link} onChange={handleChange} required />
            <TextField
                label="Technology"
                name="technology"
                value={formData.technology}
                onChange={handleChange}
                required
            />
            <Button
                color="success"
                variant="outlined"
                sx={{
                    mt: 3,
                    mb: 2,
                    border: "2px solid black",
                    color: "black",
                    borderColor: "black",
                    "&:hover": {
                        borderColor: "black",
                        color: "black",
                    },
                }}
                type="submit"
            >
                {project ? "Update Project" : "Create New Project"}
            </Button>
        </Box>
    );
};

export default CreateProjectForm;
