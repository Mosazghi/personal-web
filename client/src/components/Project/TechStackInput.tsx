import { useState } from "react";
import { TextField, Chip, Box } from "@mui/material";
import Button from "../Button";
interface TechStackInputProps {
    techStacks: string[];
    setTechStacks: (techStacks: string[]) => void;
}

const TechStackInput = ({ techStacks, setTechStacks }: TechStackInputProps) => {
    const [techStack, setTechStack] = useState<string>("");

    const handleAddTechStack = () => {
        if (techStack && !techStacks.includes(techStack)) {
            setTechStacks([...techStacks, techStack]);
            setTechStack("");
        }
    };

    const handleDeleteTechStack = (tech: string) => {
        setTechStacks(techStacks.filter((t) => t !== tech));
    };

    return (
        <Box>
            <TextField
                label="Add Technology"
                value={techStack}
                sx={{ mr: 1 }}
                onChange={(e) => setTechStack(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTechStack();
                    }
                }}
            />
            <Button onClick={handleAddTechStack} text="Add" />
            <Box mt={2}>
                {techStacks.map((tech, index) => (
                    <Chip
                        key={index}
                        label={tech}
                        onDelete={() => handleDeleteTechStack(tech)}
                        style={{ margin: "4px" }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TechStackInput;
