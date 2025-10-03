import { Pencil, Trash2 } from "lucide-react";
import { Project } from "../Project/project-form";

interface Column {
    headerName: string;
    field: string;
    link?: boolean;
    array?: boolean;
}

interface DataTableProps {
    data: Project[];
    columns: Column[];
    onDelete: (id: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onEdit: (item: any) => void;
}

const DataTable = ({ data, columns, onDelete, onEdit }: DataTableProps) => {
    return (
        <div className="overflow-x-auto bg rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.field}
                                className="px-2 py-2 text-left text-xs font-medium  uppercase tracking-wider"
                            >
                                {column.headerName}
                            </th>
                        ))}
                        <th className="px-2 py-2 text-left text-xs font-medium  uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td
                                    key={column.field}
                                    className="px-2 py-2 whitespace-nowrap text-sm  max-w-24 text-ellipsis overflow-hidden"
                                >
                                    {column.link ? (
                                        <a
                                            href={item[column.field]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {item[column.field]}
                                        </a>
                                    ) : column.array ? (
                                        item[column.field].join(", ")
                                    ) : (
                                        item[column.field]
                                    )}
                                </td>
                            ))}
                            <td className="px-2 py-2 whitespace-nowrap text-sm">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="p-2  rounded-full inline-flex items-center"
                                    aria-label="Edit"
                                >
                                    <Pencil className="h-5 w-5 text-blue-700" />
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="p-2  rounded-full inline-flex items-center ml-2"
                                    aria-label="Delete"
                                >
                                    <Trash2 className="h-5 w-5 text-red-700" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
