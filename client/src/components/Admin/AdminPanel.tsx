import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import cookies from "../../utils/cookies";
import { deleteData, fetchData } from "../../utils/fetch";
import getApiPath from "../../utils/getApiPath";
import Button from "../Button";
import CreateCourseForm, { Course } from "../Course/CourseForm";
import CreateProjectForm, { Project } from "../Project/ProjectForm";
import DataTable from "./Table";
import { courseColumns, projectColumns } from "./columnsData";
const AdminPanel = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [openCourseDialog, setOpenCourseDialog] = useState(false);
    const [openProjectDialog, setOpenProjectDialog] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const fetchCourses = useCallback(async () => {
        const apiUrl = getApiPath() + import.meta.env.VITE_COURSES_URL;

        const headers = {
            Authorization: `Bearer ${cookies.get("TOKEN")}`,
        };
        const data = await fetchData({ url: apiUrl, headers });
        setCourses(data);
    }, []);

    const fetchProjects = useCallback(async () => {
        const apiUrl = getApiPath() + import.meta.env.VITE_PROJECTS_URL;
        const headers = {
            Authorization: `Bearer ${cookies.get("TOKEN")}`,
        };
        const data = await fetchData({ url: apiUrl, headers });
        setProjects(data);
    }, []);

    const handleDeleteCourse = useCallback(async (id: number) => {
        const apiUrl = getApiPath() + import.meta.env.VITE_COURSES_URL + `/${id}`;
        const success = await deleteData(apiUrl);
        if (success) {
            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
        }
    }, []);

    const handleDeleteProject = useCallback(async (id: number) => {
        const apiUrl = getApiPath() + import.meta.env.VITE_PROJECTS_URL + `/${id}`;
        const success = await deleteData(apiUrl);
        if (success) {
            setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
        }
    }, []);

    const handleEditCourse = (course: Course) => {
        setEditingCourse(course);
        setOpenCourseDialog(true);
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setOpenProjectDialog(true);
    };

    useEffect(() => {
        fetchCourses();
        fetchProjects();
    }, [fetchCourses, fetchProjects]);

    const handleFormSuccess = (fetchFunction: () => Promise<void>, closeDialogFunction: () => boolean) => {
        fetchFunction();
        closeDialogFunction();
    };

    const MemoizedData = (data: (Course | Project)[]) => useMemo(() => data, [data]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenDialog = (setOpenDialogFunction: any) => () => setOpenDialogFunction(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCloseDialog = (setOpenDialogFunction: any) => () => setOpenDialogFunction(false);

    return (
        <Box color={"whitesmoke"}>
            <Box my={3}>
                <Button darkMode onClick={handleOpenDialog(setOpenCourseDialog)} text="Create New Course" />
            </Box>
            <Typography variant="h4" mb={2} fontStyle={"italic"}>
                Courses
            </Typography>
            <DataTable
                data={MemoizedData(courses)}
                columns={courseColumns}
                onDelete={handleDeleteCourse}
                onEdit={handleEditCourse}
            />
            <Box my={3}>
                <Button darkMode onClick={handleOpenDialog(setOpenProjectDialog)} text="Create New Project" />
            </Box>
            <Typography variant="h4" mb={2} fontStyle={"italic"}>
                Projects
            </Typography>
            <DataTable
                data={MemoizedData(projects)}
                columns={projectColumns}
                onDelete={handleDeleteProject}
                onEdit={handleEditProject}
            />

            <Dialog open={openCourseDialog} onClose={handleCloseDialog(setOpenCourseDialog)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
                <DialogContent>
                    <CreateCourseForm
                        onSuccess={() => handleFormSuccess(fetchCourses, handleCloseDialog(setOpenCourseDialog))}
                        onError={(message) => alert(message)}
                        course={editingCourse}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog(setOpenCourseDialog)} text="Cancel" />
                </DialogActions>
            </Dialog>
            <Dialog open={openProjectDialog} onClose={handleCloseDialog(setOpenProjectDialog)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
                <DialogContent>
                    <CreateProjectForm
                        onSuccess={() => handleFormSuccess(fetchProjects, handleCloseDialog(setOpenProjectDialog))}
                        onError={(message) => alert(message)}
                        project={editingProject}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog(setOpenProjectDialog)} text="Cancel" />
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminPanel;
