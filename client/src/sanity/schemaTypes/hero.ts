import { defineType } from "sanity";

export default defineType({
    name: "heroSettings",
    title: "Hero Settings",
    type: "document",
    fields: [
        {
            name: "titles",
            title: "Titles",
            type: "array",
            of: [{ type: "string" }],
            description: "List of rotating titles shown in the hero section",
        },
        { name: "name", title: "Display name", type: "string" },
    ],
});
