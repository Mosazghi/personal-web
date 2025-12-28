import { defineType } from "sanity";

export default defineType({
    name: "about",
    title: "About",
    type: "document",
    fields: [
        {
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
        },
    ],
});
