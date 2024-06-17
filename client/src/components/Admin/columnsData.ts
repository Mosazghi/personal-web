export const courseColumns = [
    { field: "name", headerName: "Name" },
    { field: "semester", headerName: "Semester" },
    { field: "description", headerName: "Description" },
    { field: "grade", headerName: "Grade" },
    { field: "urlLink", headerName: "Link", link: true },
    { field: "type", headerName: "Type" },
];

export const projectColumns = [
    { field: "name", headerName: "Name" },
    { field: "description", headerName: "Description" },
    { field: "repositoryLink", headerName: "Repository link", link: true },
    { field: "showcaseLink", headerName: "Showcase link", link: true },
    { field: "previewLink", headerName: "Preview link", link: true },
    { field: "techStack", headerName: "Technology stack", array: true },
];
