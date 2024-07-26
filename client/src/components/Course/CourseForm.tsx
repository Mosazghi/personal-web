import { Box, FormControl, InputLabel, ListSubheader, MenuItem, Select, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import cookies from "../../utils/cookies";
import getApiPath from "../../utils/getApiPath";
import Button from "../Button";
import { request } from "../../utils/fetch";
import noChangesMade from "../../utils/noChangesMade";

export interface Course {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
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
    semester: "24-H2",
    description: "",
    grade: "",
    urlLink: "",
    type: "O",
};
const CreateCourseForm = ({ onSuccess, onError, course }: CourseFormProps) => {
    const [formData, setFormData] = useState(defualtCourse);

    useEffect(() => {
        if (course) {
            setFormData(course);
        }
    }, [course]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const config = {
            method: course ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.get("TOKEN")}`,
            },
            url: getApiPath() + import.meta.env.VITE_COURSES_URL + (course ? `/${course.id}` : ""),
            data: formData,
        };

        try {
            const data = await request(config);

            if (data) {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Name" name="name" sx={{ mt: 1 }} value={formData.name} onChange={handleChange} required />
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
            <FormControl>
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
            <Button disabled={noChangesMade(course, formData)} type="submit" text={course ? "Update Course " : "Create New Course"} />
        </Box>
    );
};

export default CreateCourseForm;
