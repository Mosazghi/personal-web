import { Box, Grid, Typography, Link } from "@mui/material";
import Project, { ProjectProps } from "./Project";
import { blueGrey } from "@mui/material/colors";

const testProjects: ProjectProps[] = [
    {
        name: "my_t",
        description: "A custom serial terminal for interfacing with microcontrollers.",
        showcaseLink: "https://i.imgur.com/mnL3xYa.gif",
        repositoryLink: "",
        language: ["C++", "Qt"],
    },
    {
        name: "my_t",
        description: "A custom serial terminal for interfacing with microcontrollers.",
        showcaseLink: "https://i.imgur.com/mnL3xYa.gif",
        repositoryLink: "https://github.com/",
        language: ["C++", "Qt"],
    },
];

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
    if (testProjects.length === 0) {
        return <NoProjects />;
    }
    return (
        <Box py={3}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                {testProjects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Project {...project} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProjectList;
