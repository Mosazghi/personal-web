import { type SchemaTypeDefinition } from "sanity";
import about from "./about";
import education from "./education";
import experience from "./experience";
import hero from "./hero";
import project from "./project";
import skill from "./skill";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [project, hero, about, experience, education, skill],
};
