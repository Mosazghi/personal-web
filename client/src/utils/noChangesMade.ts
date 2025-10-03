import { Project } from "../components/Project/project-form";

const noChangesMade = (obj: Project | null | undefined, formData?: object) => {
    if (obj && JSON.stringify(obj) === JSON.stringify(formData)) {
        return true;
    }
    return false;
};

export default noChangesMade;
