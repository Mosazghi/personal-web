import { Box, Grid, Link, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import getApiPath from "../../utils/getApiPath";
import LoadingStatus from "../LoadingStatus";
import Project, { ProjectProps } from "./Project";
import { request } from "../../utils/fetch";

const NoProjects = () => {
    return (
        <Typography
            variant="h5"
            textAlign="center"
            sx={{ fontSize: { xs: "1.2rem", md: "1.6rem" } }}
            color={blueGrey[200]}
            gutterBottom
        >
            Coming soon... In the meantime check out my{" "}
            <Link href="https://github.com/Mosazghi" underline="hover" color="white">
                github account
            </Link>
        </Typography>
    );
};

const ProjectList = () => {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: "GET",
            url: getApiPath() + import.meta.env.VITE_PROJECTS_URL,
        };

        setLoading(true);
        request(config)
            .then((response) => response)
            .then((data) => {
                setProjects(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingStatus message="Loading projects" />;
    }

    if (projects.length === 0) {
        return <NoProjects />;
    }
    return (
        <Box component="section" py={3}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                {projects.map((project, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Project {...project} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProjectList;
