import { useCallback, useEffect, useMemo, useState } from "react";
import cookies from "../../utils/cookies";
import { apiFetch } from "../../utils/fetch";
import getApiPath from "../../utils/getApiPath";
import CreateProjectForm, { Project } from "../Project/project-form";
import { Button } from "../ui/button";
import { projectColumns } from "./column-data";
import DataTable from "./table";

const AdminPanel = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [openProjectDialog, setOpenProjectDialog] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [selectedTab, setSelectedTab] = useState(0);

    const fetchProjects = useCallback(async () => {
        const config = {
            method: "GET",
            url: getApiPath() + import.meta.env.VITE_PROJECTS_URL,
            headers: {
                Authorization: `Bearer ${cookies.get("TOKEN")}`,
            },
        };
        const data = await apiFetch(config);
        setProjects(data);
    }, []);

    const handleDeleteProject = useCallback(async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        const config = {
            method: "DELETE",
            url: getApiPath() + import.meta.env.VITE_PROJECTS_URL + `/${id}`,
            headers: {
                Authorization: `Bearer ${cookies.get("TOKEN")}`,
            },
        };

        const success = await apiFetch(config);
        if (success) {
            setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
        }
    }, []);

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setOpenProjectDialog(true);
    };

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleFormSuccess = (fetchFunction: () => Promise<void>, closeDialogFunction: () => boolean) => {
        fetchFunction();
        closeDialogFunction();
    };

    const MemoizedData = (data: Project[]) => useMemo(() => data, [data]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenDialog = (setOpenDialogFunction: any) => () => {
        setOpenDialogFunction(true);

        if (editingProject) setEditingProject(null);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCloseDialog = (setOpenDialogFunction: any) => () => setOpenDialogFunction(false);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <div className="min-h-screen">
            <div className="flex border-b">
                <button
                    className={`flex-1 py-3 text-center ${
                        selectedTab === 0 ? " border-b-2 border-white" : "text-gray-400"
                    }`}
                    onClick={(e) => handleTabChange(e, 0)}
                >
                    Projects
                </button>
            </div>

            {selectedTab === 0 && (
                <>
                    <div className="my-3">
                        <Button onClick={handleOpenDialog(setOpenProjectDialog)}> Create New Project</Button>
                    </div>
                    <h4 className="text-4xl mb-2 italic">Projects</h4>
                    <DataTable
                        data={MemoizedData(projects)}
                        columns={projectColumns}
                        onDelete={handleDeleteProject}
                        onEdit={handleEditProject}
                    />
                </>
            )}

            {openProjectDialog && (
                <div className="bg-black fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className=" rounded-lg p-6 max-w-sm w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-4 ">
                            {editingProject ? "Edit Project" : "Create New Project"}
                        </h2>
                        <div className="">
                            <CreateProjectForm
                                onSuccess={() =>
                                    handleFormSuccess(fetchProjects, handleCloseDialog(setOpenProjectDialog))
                                }
                                onError={(message) => alert(message)}
                                project={editingProject}
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={handleCloseDialog(setOpenProjectDialog)}> Cancel </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
