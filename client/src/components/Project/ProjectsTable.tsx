import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

interface Project {
    id: number;
    name: string;
    description: string;
    link: string;
    technology: string;
}

interface ProjectsTableProps {
    projects: Project[];
    onDelete: (id: number) => void;
    onEdit: (project: Project) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects, onDelete, onEdit }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ "& .MuiTableCell-sizeMedium": { padding: "5px 5px" } }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Link</TableCell>
                        <TableCell>Technology</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>{project.name}</TableCell>
                            <TableCell>
                                {project.description.length > 15
                                    ? `${project.description.substring(0, 15)}...`
                                    : project.description}
                            </TableCell>
                            <TableCell>
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    {project.link}
                                </a>
                            </TableCell>
                            <TableCell>{project.technology}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(project)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(project.id)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProjectsTable;
