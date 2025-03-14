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
import { IconButton, Tooltip } from "@mui/material";
import isMobileDevice from "../../utils/isMobileDevice";

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
    const isMobile = isMobileDevice();
    const split = showcaseLink.split("|");
    showcaseLink = !isMobile ? split[0] : split[1]; // mp4. | .gif

    useEffect(() => {
        const config = {
            method: "GET",
            url: "https://api.npoint.io/961a5a6ec930fb9da6f8",
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
                    backgroundColor: "black",
                }}
                onClick={() => window.open(previewLink)}
            >
                <CardMedia
                    component={isMobile ? "img" : "video"}
                    sx={{
                        "&:hover": { opacity: 0.5 },
                        maxHeight: !isMobile ? 350 : "auto",
                    }}
                    onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                    src={showcaseLink}
                    {...(!isMobile && { autoPlay: true, loop: true, disablePictureInPicture: true })}
                />
            </ButtonBase>
            <CardContent sx={{ pt: 1 }}>
                <Stack direction={"row"} alignItems={"center"} alignContent={"center"}>
                    <Typography gutterBottom variant="h5" mb={0}>
                        {name}
                    </Typography>
                    <Tooltip title="View on GitHub" placement="right">
                        <IconButton href={repositoryLink} target="_blank" aria-label="open repository">
                            <ArrowOutwardIcon sx={{ color: "black" }} fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack px={1} gap={1} direction={"row"}>
                    {techStack.map((tech, i) => (
                        <Box component="span" key={i} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Tooltip title={tech} placement="bottom">
                                <img src={techLogos[tech]} alt={tech} style={{ height: 21, width: 21 }} />
                            </Tooltip>
                        </Box>
                    ))}
                </Stack>
            </CardActions>
        </Card>
    );
};

export default Project;
