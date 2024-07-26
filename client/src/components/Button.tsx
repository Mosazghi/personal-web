import { Button as ButtonMui, ButtonProps as ButtonMuiProps } from "@mui/material";

interface ButtonProps extends Omit<ButtonMuiProps, 'color' | 'variant'> {
    onClick?: () => void;
    text: string;
    link?: string;
    darkMode?: boolean;
}

const Button = ({
    onClick,
    text,
    link,
    size = "medium",
    darkMode = false,
    type = "button",
    fullWidth = false,
    ...props
}: ButtonProps): JSX.Element => {
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
            {...props}
        >
            {text}
        </ButtonMui>
    );
};

export default Button;
