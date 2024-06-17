import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
    IconButton,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Course } from "../Course/CourseForm";
import { Project } from "../Project/ProjectForm";
interface Column {
    headerName: string;
    field: string;
    link?: boolean;
    array?: boolean;
}

interface DataTableProps {
    data: (Course | Project)[];
    columns: Column[];
    onDelete: (id: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onEdit: (item: any) => void;
}

const DataTable = ({ data, columns, onDelete, onEdit }: DataTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ "& .MuiTableCell-sizeMedium": { padding: "5px 5px" } }}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.field}>{column.headerName}</TableCell>
                        ))}
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            {columns.map((column) => (
                                <TableCell key={column.field}>
                                    {column.link ? (
                                        <Link href={item[column.field]} target="_blank" rel="noopener noreferrer">
                                            {item[column.field]}
                                        </Link>
                                    ) : column.array ? (
                                        item[column.field].join(", ")
                                    ) : (
                                        item[column.field]
                                    )}
                                </TableCell>
                            ))}
                            <TableCell>
                                <IconButton onClick={() => onEdit(item)} color="primary">
                                    <EditIcon sx={{ color: "darkblue" }} />
                                </IconButton>
                                <IconButton onClick={() => onDelete(item.id)} color="secondary">
                                    <DeleteIcon sx={{ color: "darkred" }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
