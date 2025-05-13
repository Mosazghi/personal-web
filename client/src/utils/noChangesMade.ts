import { Project } from "../components/Project/ProjectForm";

const noChangesMade = (obj: Project | null | undefined, formData?: Object) => {
    if (obj && JSON.stringify(obj) === JSON.stringify(formData)) {
        return true;
    }
    return false;
};

export default noChangesMade;

