import { Button as ButtonMui } from "@mui/material";

interface ButtonProps {
    onClick?: () => void;
    text: string;
    link?: string;
    size?: "small" | "medium" | "large";
    darkMode?: boolean;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean | undefined;
}

const Button = ({
    onClick,
    text,
    link,
    size = "medium",
    darkMode = false,
    type = "button",
    fullWidth = false,
}: ButtonProps) => {
    const color = darkMode ? "white" : "black";
    return (
        <ButtonMui
            fullWidth={fullWidth}
            color="success"
            variant="outlined"
            onClick={onClick}
            size={size}
            href={link}
            type={type}
            {...(link && { target: "_blank" })}
            sx={{
                border: `2px solid ${color}`,
                color: color,
                borderColor: color,
                "&:hover": { borderColor: color, color: color },
            }}
        >
            {text}
        </ButtonMui>
    );
};
export default Button;
