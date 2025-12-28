import { defineType } from "sanity";

export default defineType({
    name: "skills",
    title: "Skills",
    type: "document",
    description: "A single document containing an array of skill items for the site",
    fields: [
        {
            name: "items",
            title: "Skill Items",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Skill",
                    fields: [{ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }],
                    preview: {
                        select: { title: "name", subtitle: "category" },
                    },
                },
            ],
        },
    ],
});
