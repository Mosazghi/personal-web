import { X } from "lucide-react";
import { useState } from "react";
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
        <div>
            <div className="flex items-center gap-2">
                <input
                    placeholder="Add Technology"
                    value={techStack}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setTechStack(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTechStack();
                        }
                    }}
                />
                <Button onClick={handleAddTechStack} text="Add" />
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
                {techStacks.map((tech, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full text-sm"
                    >
                        {tech}
                        <button
                            type="button"
                            onClick={() => handleDeleteTechStack(tech)}
                            className="hover:bg-gray-300 rounded-full p-0.5"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TechStackInput;
