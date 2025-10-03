import AboutMe from "../components/AboutMe";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeadingText from "../components/HeadingText";
import ProjectList from "../components/Project/ProjectList";

function Home() {
    return (
        <>
            <Header />
            <main className="px-0 xl:px-28 pb-16">
                <AboutMe />
                <HeadingText text="Featured Projects" />
                <ProjectList />
            </main>
            <Footer />
        </>
    );
}

export default Home;
