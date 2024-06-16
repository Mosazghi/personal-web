import { ReactNode } from "react";
import { Box } from "@mui/material";

interface LayoutProps {
    children: ReactNode;
}

const FormLayout = ({ children }: LayoutProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(to bottom, #f7fafc, #e2e8f0, #cbd5e0)",
                WebkitBackgroundClip: "text",
                color: "transparent",
            }}
        >
            {children}
        </Box>
    );
};

export default FormLayout;
