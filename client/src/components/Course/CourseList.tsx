import { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import getApiPath from "../../utils/getApiPath";
import groupBy from "../../utils/groupBy";
import LoadingCourses from "../LoadingCourses";
import Course, { CourseProps } from "./Course";

type GroupedCourses = Record<string, CourseProps[]>;

const CourseList = () => {
    const [courses, setCourses] = useState<GroupedCourses>({});
    const [loading, setLoading] = useState(true);

    const urlWithProxy = getApiPath() + import.meta.env.VITE_GET_COURSES_URL;
    useEffect(() => {
        let ignore = false;

        async function getCourses() {
            setLoading(true);
            try {
                console.log(getApiPath(), import.meta.env.VITE_GET_COURSES_URL)
                const res = await fetch(urlWithProxy);
                const fetchedCourses: CourseProps[] = await res.json();
                console.log(fetchedCourses);
                const sortedCourses = groupBy(fetchedCourses, "semester");
                if (!ignore) {
                    setCourses(sortedCourses);
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        getCourses();

        return () => {
            ignore = true;
        };
    }, []);

    if (loading) {
        return <LoadingCourses />;
    }

    return (
        <section>
            {Object.entries(courses).map(([semester, courseList], i) => (
                <Collapsible key={semester} tabIndex={i} trigger={`${i + 1}. Semester`}>
                    {courseList.map((course, j) => (
                        <Course key={j} {...course} />
                    ))}
                </Collapsible>
            ))}
        </section>
    );
};

export default CourseList;
