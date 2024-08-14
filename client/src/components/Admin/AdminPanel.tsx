import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Tabs, Tab } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import cookies from "../../utils/cookies";
import getApiPath from "../../utils/getApiPath";
import Button from "../Button";
import CreateCourseForm, { Course } from "../Course/CourseForm";
import CreateProjectForm, { Project } from "../Project/ProjectForm";
import DataTable from "./Table";
import { courseColumns, projectColumns } from "./columnsData";
import { request } from "../../utils/fetch";

const tabStyles = {
    color: "gray",
    "&.Mui-selected": {
        color: "whitesmoke",
    },
};

const AdminPanel = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [openCourseDialog, setOpenCourseDialog] = useState(false);
    const [openProjectDialog, setOpenProjectDialog] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [selectedTab, setSelectedTab] = useState(0); // State to manage the selected tab

    const fetchCourses = useCallback(async () => {
        const config = {
            method: "GET",
            url: getApiPath() + import.meta.env.VITE_COURSES_URL,
            headers: {
                Authorization: `Bearer ${cookies.get("TOKEN")}`,
            },
        };
        const data = await request(config);

        setCourses(data);
    }, []);

    const fetchProjects = useCallback(async () => {
        const config = {
            method: "GET",
            url: getApiPath() + import.meta.env.VITE_PROJECTS_URL,
            headers: {
                Authorization: `Bearer ${cookies.get("TOKEN")}`,
            },
        };
        const data = await request(config);
        setProjects(data);
    }, []);

    const handleDeleteCourse = useCallback(async (id: number) => {
        const config = {
            method: "DELETE",
            url: getApiPath() + import.meta.env.VITE_COURSES_URL + `/${id}`,
            headers: {
                Authorization: `Bearer ${cookies.get("TOKEN")}`,
            },
        };
        const success = await request(config);

        if (success) {
            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
        }
    }, []);

    const handleDeleteProject = useCallback(async (id: number) => {
        const config = {
            method: "DELETE",
            url: getApiPath() + import.meta.env.VITE_PROJECTS_URL + `/${id}`,
            headers: {
                Authorization: `Bearer ${cookies.get("TOKEN")}`,
            },
        };

        const success = await request(config);
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

    const handleOpenDialog = (setOpenDialogFunction: any) => () => {
        setOpenDialogFunction(true);

        if (editingCourse) setEditingCourse(null);
        if (editingProject) setEditingProject(null);
    };

    const handleCloseDialog = (setOpenDialogFunction: any) => () => setOpenDialogFunction(false);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box color={"whitesmoke"} minHeight={"100vh"}>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                    "& .MuiTabs-indicator": {
                        backgroundColor: "whitesmoke",
                    },
                }}
            >
                <Tab label="Courses" sx={tabStyles} />
                <Tab label="Projects" sx={tabStyles} />
            </Tabs>

            {selectedTab === 0 && (
                <>
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
                </>
            )}

            {selectedTab === 1 && (
                <>
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
                </>
            )}

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
