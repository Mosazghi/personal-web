import { defineType } from "sanity";

export default defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name", maxLength: 96 },
        },
        {
            name: "description",
            title: "Description",
            type: "array",
            of: [{ type: "block" }],
        },
        { name: "repositoryLink", title: "Repository Link", type: "url" },
        { name: "previewLink", title: "Preview Link", type: "url" },
        { name: "showcaseLinkMp4", title: "Showcase Link MP4", type: "url" },
        { name: "showcaseLinkGif", title: "Showcase Link GIF", type: "url" },
        {
            name: "techStack",
            title: "Tech Stack",
            type: "array",
            of: [{ type: "string" }],
        },

        { name: "startDate", title: "Start Date", type: "date" },
        { name: "endDate", title: "End Date", type: "date" },
    ],
});
