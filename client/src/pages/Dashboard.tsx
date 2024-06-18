import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AdminPanel from "../components/Admin/AdminPanel";
import cookies from "../utils/cookies";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        cookies.remove("TOKEN", { path: "/" });
        navigate("/");
    };

    return (
        <Box py={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
                <Typography
                    variant="h1"
                    color="white"
                    sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, textAlign: "center" }}
                >
                    Dashboard
                </Typography>
                <Box minWidth={"80px"}>
                    <IconButton href="/" color="primary">
                        <HomeIcon sx={{ color: "whitesmoke" }} />
                    </IconButton>
                    <IconButton onClick={handleLogout} color="primary">
                        <LogoutIcon sx={{ color: "whitesmoke" }} />
                    </IconButton>
                </Box>
            </Box>
            <AdminPanel />
        </Box>
    );
}

export default Dashboard;
