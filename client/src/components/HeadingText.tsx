import { Typography } from "@mui/material";

interface HeadingTextProps {
    text: string;
}

const HeadingText = ({ text }: HeadingTextProps) => {
    return (
        <Typography
            variant="h2"
            sx={{
                color: "white",
                textDecoration: "underline",
                textDecorationColor: "lightsteelblue",
                fontSize: { xs: "1.65rem", md: "2.5rem" },
                fontWeight: "bold",
                fontStyle: "italic",
                mt: 8,
                mb: 4,
                textAlign: { md: "center" },
            }}
        >
            {text}
        </Typography>
    );
};
export default HeadingText;
