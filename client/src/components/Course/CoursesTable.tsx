import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

interface Course {
    id: number;
    name: string;
    semester: string;
    description: string;
    grade: string;
    urlLink: string;
    type: string;
}

interface CoursesTableProps {
    courses: Course[];
    onDelete: (id: number) => void;
    onEdit: (course: Course) => void;
}

const CoursesTable: React.FC<CoursesTableProps> = ({ courses, onDelete, onEdit }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ "& .MuiTableCell-sizeMedium": { padding: "5px 7px" } }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Semester</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Link</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.map((course) => (
                        <TableRow key={course.id}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.semester}</TableCell>
                            <TableCell>
                                {course.description.length > 15
                                    ? `${course.description.substring(0, 15)}...`
                                    : course.description}
                            </TableCell>
                            <TableCell>{course.grade}</TableCell>
                            <TableCell>
                                <a href={course.urlLink} target="_blank" rel="noopener noreferrer">
                                    {course.urlLink}
                                </a>
                            </TableCell>
                            <TableCell>{course.type}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(course)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(course.id)} color="secondary">
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

export default CoursesTable;
