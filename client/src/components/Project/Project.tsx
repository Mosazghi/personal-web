import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { request } from "../../utils/fetch";
import ButtonBase from "@mui/material/ButtonBase";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { IconButton } from "@mui/material";
export interface ProjectProps {
    name: string;
    description: string;
    showcaseLink: string;
    repositoryLink: string;
    previewLink: string;
    techStack: string[];
}

const Project = ({ name, description, showcaseLink, techStack, previewLink, repositoryLink }: ProjectProps) => {
    const [techLogos, setTechLogos] = useState<Record<string, string>>({});

    useEffect(() => {
        const config = {
            method: "GET",
            url: "https://api.jsonbin.io/v3/b/66706c8ce41b4d34e404a7af",
            headers: {
                "X-Master-Key": import.meta.env.VITE_ABOUT_ME_API_KEY,
                "X-Bin-Meta": "false",
            },
        };
        request(config)
            .then((response) => response)
            .then((data) => setTechLogos(data));
    }, []);

    return (
        <Card sx={{ width: "100%" }}>
            <ButtonBase
                sx={{
                    width: "100%",
                    "&:hover": { backgroundColor: "black" },
                }}
                onClick={() => window.open(previewLink)}
            >
                <CardMedia
                    component="img"
                    alt={name}
                    height="200"
                    sx={{
                        //dim the image when hovered
                        "&:hover": { opacity: 0.5 },
                    }}
                    image={showcaseLink}
                />
            </ButtonBase>
            <CardContent sx={{ pt: 1 }}>
                <Stack direction={"row"} alignItems={"center"} alignContent={"center"}>
                    <Typography gutterBottom variant="h5" mb={0}>
                        {name}
                    </Typography>
                    <IconButton href={repositoryLink} target="_blank" aria-label="open repository">
                        <ArrowOutwardIcon sx={{ color: "black" }} fontSize="medium" />
                    </IconButton>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack px={1} gap={1} direction={"row"}>
                    {techStack.map((tech, i) => (
                        <Box component="span" key={i} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <img src={techLogos[tech]} alt={tech} style={{ height: 21, width: 21 }} />
                        </Box>
                    ))}
                </Stack>
            </CardActions>
        </Card>
    );
};

export default Project;
