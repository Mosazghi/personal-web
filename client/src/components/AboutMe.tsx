import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const AboutMe = () => {
    const [aboutInfo, setAboutInfo] = useState("");
    useEffect(() => {
        const apiKey = import.meta.env.VITE_ABOUT_ME_API_KEY;
        fetch("https://api.jsonbin.io/v3/b/65948ae8dc746540188c2440", {
            headers: {
                "X-Master-Key": apiKey,
                "X-Bin-Meta": "false",
            },
        })
            .then((response) => response.json())
            .then((data) => setAboutInfo(data.text));
    }, []);

    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            gap={2}
            justifyContent="center"
            color="transparent"
            sx={{
                background: "linear-gradient(to bottom, #f7fafc, #e2e8f0, #cbd5e0)",
                WebkitBackgroundClip: "text",
            }}
        >
            <Typography variant="h3" fontStyle={"italic"} fontSize={{ xs: "1.5rem", md: "2.5rem" }}>
                Briefly about me
            </Typography>
            <Box>
                {aboutInfo &&
                    aboutInfo.split("\n").map((line, i) => (
                        <Typography key={i} fontSize={{ xs: "1.125rem", md: "1.125rem" }}>
                            {i !== 0 && <br />}
                            {line}
                        </Typography>
                    ))}
            </Box>
        </Stack>
    );
};

export default AboutMe;
