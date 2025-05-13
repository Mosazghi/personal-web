import AboutMe from "../components/AboutMe";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeadingText from "../components/HeadingText";
import ProjectList from "../components/Project/ProjectList";
import { Box } from "@mui/material";

function Home() {
    return (
        <>
            <Header />
            <Box component="main" sx={{ px: { xl: 28 }, pb: 16 }}>
                <AboutMe />
                <HeadingText text="Featured Projects" />
                <ProjectList />
            </Box>
            <Footer />
        </>
    );
}

export default Home;
