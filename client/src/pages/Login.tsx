import axios from "axios";
import { useNavigate } from "react-router-dom";
import getApiPath from "../utils/getApiPath";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { blueGrey } from "@mui/material/colors";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { Navigate } from "react-router-dom";
import cookies from "../utils/cookies";

const inputStyles = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "&.Mui-focused fieldset": {
            borderColor: "white",
        },
    },
    "& .MuiInputBase-input": {
        color: "white",
    },
    "& .MuiInputLabel-root": {
        color: "white",
    },
};
export default function Login() {
    if (cookies.get("TOKEN")) {
        return <Navigate to="/admin/dashboard" />;
    }

    const navigate = useNavigate();
    const authUrl = getApiPath() + import.meta.env.VITE_ADMIN_LOGIN_URL;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const config = {
            method: "post",
            url: authUrl,
            data: {
                username: data.get("username"),
                password: data.get("password"),
            },
        };
        axios(config)
            .then((res) => {
                cookies.set("TOKEN", res.data.token, {
                    path: "/",
                });
                navigate("/admin/dashboard");
            })
            .catch(() => {
                return new Error();
            });
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                backgroundColor: "inherit",
                border: "2px solid white",
                borderRadius: "20px",
                label: {
                    color: "white",
                    "& .Mui-focused": {
                        color: "white",
                    },
                },
            }}
        >
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5" color="white">
                    Sign in
                </Typography>
                <Box component="hr" sx={{ width: "90%", borderColor: "white" }} />
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "90%", mt: 1, mb: 1 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Typography variant="body1" sx={{ py: 1 }}>
                            Username
                        </Typography>
                        <TextField
                            variant="outlined"
                            type="text"
                            id="navn"
                            name="username"
                            placeholder="username"
                            fullWidth
                            required
                            sx={inputStyles}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Typography variant="body1" sx={{ py: 1 }}>
                            Password
                        </Typography>
                        <TextField
                            variant="outlined"
                            type="password"
                            id="pass"
                            name="password"
                            placeholder="password"
                            fullWidth
                            required
                            sx={inputStyles}
                        />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        color="success"
                        variant="outlined"
                        sx={{
                            mt: 3,
                            mb: 2,
                            border: "2px solid white",
                            color: "white",
                            borderColor: "white",
                            "&:hover": {
                                borderColor: "white",
                                color: "white",
                            },
                        }}
                    >
                        Sign In
                    </Button>
                    <Link href="/" variant="body1" textAlign={"end"} underline="hover">
                        <Typography color={blueGrey[200]}>Return to portfolio</Typography>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
