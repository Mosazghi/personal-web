import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { blueGrey } from "@mui/material/colors";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import cookies from "../utils/cookies";
import getApiPath from "../utils/getApiPath";
import { request } from "../utils/fetch";
import { useState } from "react";
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
    const navigate = useNavigate();

    if (cookies.get("TOKEN")) {
        return <Navigate to="/admin/dashboard" />;
    }

    const authUrl = getApiPath() + import.meta.env.VITE_ADMIN_LOGIN_URL;
    const [error, setError] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const config = {
            url: authUrl,
            method: "POST",
            data: {
                username: data.get("username"),
                password: data.get("password"),
            },
        };

        request(config)
            .then((data) => {
                if (data) {
                    cookies.set("TOKEN", data.token, { path: "/" });
                    navigate("/admin/dashboard");
                } else {
                    setError("Invalid credentials");
                }
            })
            .catch(() => {
                console.log("error");
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
                            name="username"
                            placeholder="username"
                            fullWidth
                            required
                            sx={inputStyles}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} mb={3}>
                        <Typography variant="body1" sx={{ py: 1 }}>
                            Password
                        </Typography>
                        <TextField
                            variant="outlined"
                            type="password"
                            name="password"
                            placeholder="password"
                            fullWidth
                            required
                            sx={inputStyles}
                        />
                    </Box>
                    {error && (
                        <Typography variant="body1" color="error" mb={2} mt={-1}>
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" fullWidth darkMode text="Sign in" />
                    <Link href="/" variant="body1" textAlign={"end"} underline="none">
                        <Typography color={blueGrey[200]} mt={2}>
                            Return to portfolio
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
