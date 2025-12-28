import { defineType } from "sanity";

export default defineType({
    name: "education",
    title: "Education",
    type: "document",
    fields: [
        { name: "period", title: "Period", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "institution", title: "Institution", type: "string" },
        { name: "description", title: "Description", type: "array", of: [{ type: "block" }] },
        { name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] },
        { name: "order", title: "Order", type: "number" },
    ],
});
