import { defineType } from "sanity";

export default defineType({
    name: "experience",
    title: "Work Experience",
    type: "document",
    fields: [
        { name: "period", title: "Period", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "company", title: "Company", type: "string" },
        { name: "description", title: "Description", type: "array", of: [{ type: "block" }] },
        { name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] },
        { name: "order", title: "Order", type: "number" },
    ],
});
