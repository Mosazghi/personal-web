import AboutMe from "../components/AboutMe.tsx";
import CourseList from "../components/Course/CourseList.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header";
import HeadingText from "../components/HeadingText.tsx";
import ProjectList from "../components/Project/ProjectList.tsx";

function Home() {
    return (
        <>
            <Header />
            <main className="xl:px-28 pb-16">
                <AboutMe />
                <HeadingText text="Featured Projects" />
                <ProjectList />
                <HeadingText text="Courses" />
                <CourseList />
            </main>
            <Footer />
        </>
    );
}

export default Home;
