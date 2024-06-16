import { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { fetchData, deleteData } from "../../utils/fetch";
import getApiPath from "../../utils/getApiPath";
import CreateCourseForm from "../Course/CourseForm";
import CoursesTable from "../Course/CoursesTable";
import ProjectsTable from "../Project/ProjectsTable";
import CreateProjectForm from "../Project/ProjectForm";

interface Course {
    id: number;
    name: string;
    semester: string;
    description: string;
    grade: string;
    urlLink: string;
    type: string;
}

interface Project {
    id: number;
    name: string;
    description: string;
    link: string;
    technology: string;
}

const AdminPanel = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [openCourseDialog, setOpenCourseDialog] = useState(false);
    const [openProjectDialog, setOpenProjectDialog] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const fetchCourses = useCallback(async () => {
        const apiUrl = getApiPath() + import.meta.env.VITE_COURSES_URL;
        const data = await fetchData(apiUrl);
        setCourses(data);
    }, []);

    const fetchProjects = useCallback(async () => {
        const apiUrl = getApiPath() + import.meta.env.VITE_PROJECTS_URL;
        const data = await fetchData(apiUrl);
        setProjects(data);
    }, []);

    const handleDeleteCourse = useCallback(async (id: number) => {
        const apiUrl = getApiPath() + import.meta.env.VITE_COURSES_URL + `/${id}`;
        const success = await deleteData(apiUrl);
        if (success) {
            console.log("Deleted course with id: ", id);
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

    const handleOpenCourseDialog = () => {
        setEditingCourse(null);
        setOpenCourseDialog(true);
    };
    const handleCloseCourseDialog = () => setOpenCourseDialog(false);

    const handleOpenProjectDialog = () => {
        setEditingProject(null);
        setOpenProjectDialog(true);
    };
    const handleCloseProjectDialog = () => setOpenProjectDialog(false);

    const handleCourseFormSuccess = () => {
        fetchCourses();
        handleCloseCourseDialog();
    };

    const handleProjectFormSuccess = () => {
        fetchProjects();
        handleCloseProjectDialog();
    };

    const memoizedCourses = useMemo(() => courses, [courses]);
    const memoizedProjects = useMemo(() => projects, [projects]);

    return (
        <Box color={"whitesmoke"}>
            <Button
                color="success"
                variant="outlined"
                onClick={handleOpenCourseDialog}
                sx={{
                    mt: 3,
                    mb: 2,
                    border: "2px solid white",
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                        borderColor: "white",
                        color: "white",
                    },
                }}
            >
                Create New Course
            </Button>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Courses
            </Typography>
            <CoursesTable courses={memoizedCourses} onDelete={handleDeleteCourse} onEdit={handleEditCourse} />

            <Button
                color="success"
                variant="outlined"
                sx={{
                    mt: 3,
                    mb: 2,
                    border: "2px solid white",
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                        borderColor: "white",
                        color: "white",
                    },
                }}
                onClick={handleOpenProjectDialog}
            >
                Create New Project
            </Button>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Projects
            </Typography>
            <ProjectsTable projects={memoizedProjects} onDelete={handleDeleteProject} onEdit={handleEditProject} />

            <Dialog open={openCourseDialog} onClose={handleCloseCourseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
                <DialogContent>
                    <CreateCourseForm
                        onSuccess={handleCourseFormSuccess}
                        onError={(message) => alert(message)}
                        course={editingCourse}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCourseDialog} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openProjectDialog} onClose={handleCloseProjectDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
                <DialogContent>
                    <CreateProjectForm
                        onSuccess={handleProjectFormSuccess}
                        onError={(message) => alert(message)}
                        project={editingProject}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProjectDialog} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminPanel;
