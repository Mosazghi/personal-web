import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { request } from "../utils/fetch";
import LoadingStatus from "./LoadingStatus";

const AboutMe = () => {
    const [aboutInfo, setAboutInfo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: "GET",
            url: "https://api.jsonbin.io/v3/b/670a7f39acd3cb34a895a5b4 ",
            headers: {
                "X-Master-Key": import.meta.env.VITE_ABOUT_ME_API_KEY,
                "X-Bin-Meta": "false",
            },
        };
        setLoading(true);
        request(config)
            .then((response) => response)
            .then((data) => {
                setAboutInfo(data.text);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingStatus message="Loading about me" />;
    }

    return (
        <Stack
            component="section"
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
            <Box sx={{ cursor: "text" }}>
                {aboutInfo &&
                    aboutInfo.split("\n").map((line, i) => (
                        <Typography
                            key={i}
                            fontSize={{
                                xs: "1.125rem",
                                md: "1.125rem",
                            }}
                            sx={{
                                // Target the <a> tags inside this Typography
                                "& a": {
                                    textDecoration: "underline",
                                    textDecorationColor: "white",
                                    color: "inherit", // Apply color to the <a> tag
                                },
                            }}
                        >
                            {i !== 0 && <br />}
                            {/* Render the line as HTML */}
                            <span dangerouslySetInnerHTML={{ __html: line }} />
                        </Typography>
                    ))}
            </Box>
        </Stack>
    );
};

export default AboutMe;
