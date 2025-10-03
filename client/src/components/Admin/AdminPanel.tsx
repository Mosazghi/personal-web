import { useCallback, useEffect, useMemo, useState } from "react";
import cookies from "../../utils/cookies";
import { request } from "../../utils/fetch";
import getApiPath from "../../utils/getApiPath";
import { Button } from "../ui/button";
import CreateProjectForm, { Project } from "../Project/ProjectForm";
import DataTable from "./Table";
import { projectColumns } from "./columnsData";

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
        const data = await request(config);
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

        const success = await request(config);
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

    const handleOpenDialog = (setOpenDialogFunction: any) => () => {
        setOpenDialogFunction(true);

        if (editingProject) setEditingProject(null);
    };

    const handleCloseDialog = (setOpenDialogFunction: any) => () => setOpenDialogFunction(false);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <div className="text-white min-h-screen">
            <div className="flex border-b border-white">
                <button
                    className={`flex-1 py-3 text-center ${
                        selectedTab === 0 ? "text-white border-b-2 border-white" : "text-gray-400"
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
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-4 text-black">
                            {editingProject ? "Edit Project" : "Create New Project"}
                        </h2>
                        <div className="text-black">
                            <CreateProjectForm
                                onSuccess={() =>
                                    handleFormSuccess(fetchProjects, handleCloseDialog(setOpenProjectDialog))
                                }
                                onError={(message) => alert(message)}
                                project={editingProject}
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={handleCloseDialog(setOpenProjectDialog)} text="Cancel" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
