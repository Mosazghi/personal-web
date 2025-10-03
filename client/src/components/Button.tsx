interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    text: string;
    link?: string;
    darkMode?: boolean;
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
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
    const sizeClasses = {
        small: "px-2 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg",
    };

    const classes = `
        ${fullWidth ? "w-full" : ""}
        ${sizeClasses[size]}
        border-2 rounded
        font-medium
        transition-colors
        hover:opacity-80
        disabled:opacity-50 disabled:cursor-not-allowed
    `.trim();

    const style = {
        borderColor: color,
        color: color,
    };

    if (link) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block text-center no-underline ${classes}`}
                style={style}
            >
                {text}
            </a>
        );
    }

    return (
        <button onClick={onClick} type={type} className={classes} style={style} {...props}>
            {text}
        </button>
    );
};

export default Button;
