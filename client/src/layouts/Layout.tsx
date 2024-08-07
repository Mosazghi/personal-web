import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ReactNode } from "react";
interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box
            sx={{
                bgcolor: grey[900],
                px: { xs: 1.9, md: 10 },
            }}
        >
            {children}
        </Box>
    );
};

export default Layout;
