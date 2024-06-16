import { useState, useEffect, FormEvent } from "react";
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, ListSubheader } from "@mui/material";
import getApiPath from "../../utils/getApiPath";
import cookies from "../../utils/cookies";
interface Course {
    id: number;
    name: string;
    semester: string;
    description: string;
    grade: string;
    urlLink: string;
    type: string;
}

interface CourseFormProps {
    onSuccess: () => void;
    onError: (message: string) => void;
    course?: Course | null;
}

const defualtCourse = {
    name: "",
    semester: "22-H2",
    description: "",
    grade: "A",
    urlLink: "",
    type: "O",
};
const CreateCourseForm: React.FC<CourseFormProps> = ({ onSuccess, onError, course }) => {
    const [formData, setFormData] = useState(defualtCourse);

    useEffect(() => {
        if (course) {
            setFormData(course);
        }
    }, [course]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // check if the fileds havent changed
        if (course && JSON.stringify(course) === JSON.stringify(formData)) {
            alert("No changes were made.");
            return;
        }

        const apiUrl = getApiPath() + import.meta.env.VITE_COURSES_URL + (course ? `/${course.id}` : "");

        try {
            const response = await fetch(apiUrl, {
                method: course ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.get("TOKEN")}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                onSuccess();
                if (!course) {
                    setFormData(defualtCourse);
                }
            } else {
                onError(`Error submitting form:\n${data.errors[Object.keys(data.errors)[0]]}`);
            }
        } catch (e) {
            onError(`Error submitting form. Check if all fields are reasonable.`);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <FormControl required>
                <InputLabel>Semester</InputLabel>
                <Select name="semester" value={formData.semester} onChange={handleChange}>
                    <ListSubheader>1st year</ListSubheader>
                    <MenuItem value="22-H2">22-H2</MenuItem>
                    <MenuItem value="23-H1">23-H1</MenuItem>
                    <ListSubheader>2nd year</ListSubheader>
                    <MenuItem value="23-H2">23-H2</MenuItem>
                    <MenuItem value="24-H1">24-H1</MenuItem>
                    <ListSubheader>3rd year</ListSubheader>
                    <MenuItem value="24-H2">24-H2</MenuItem>
                    <MenuItem value="25-H1">25-H1</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
            />
            <FormControl required>
                <InputLabel>Grade</InputLabel>
                <Select name="grade" value={formData.grade} onChange={handleChange}>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="E">E</MenuItem>
                    <MenuItem value="Passed">Passed</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                </Select>
            </FormControl>
            <TextField label="Link" name="urlLink" value={formData.urlLink} onChange={handleChange} required />
            <FormControl required>
                <InputLabel>Type</InputLabel>
                <Select name="type" value={formData.type} onChange={handleChange}>
                    <ListSubheader>Obligatory</ListSubheader>
                    <MenuItem value="O">O</MenuItem>
                    <ListSubheader>Additonal course</ListSubheader>
                    <MenuItem value="E">E</MenuItem>
                </Select>
            </FormControl>
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
                {course ? "Update Course" : "Create New Course"}
            </Button>
        </Box>
    );
};

export default CreateCourseForm;
