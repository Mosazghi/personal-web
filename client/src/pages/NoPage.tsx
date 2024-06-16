import { Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";
function NoPage() {
    return (
        <Box
            sx={{ height: "100vh", textAlign: "center" }}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Typography variant="h2" color={"error.main"}>
                Page not found
            </Typography>
            <Link href="/" variant="body1" underline="hover">
                Go back to portfolio
            </Link>
        </Box>
    );
}

export default NoPage;
