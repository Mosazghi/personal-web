/* eslint-disable @typescript-eslint/no-unused-vars */
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import getApiPath from "../../utils/getApiPath";
import groupBy from "../../utils/groupBy";
import LoadingStatus from "../LoadingStatus";
import Course, { CourseProps } from "./Course";
type GroupedCourses = Record<string, CourseProps[]>;

const CourseList = () => {
    const [courses, setCourses] = useState<GroupedCourses>({});
    const [loading, setLoading] = useState(true);

    const urlWithProxy = getApiPath() + import.meta.env.VITE_COURSES_URL;
    useEffect(() => {
        let ignore = false;

        async function getCourses() {
            setLoading(true);
            try {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <LoadingStatus message="Loading courses" />;
    }

    return (
        <Box component={"section"}>
            {/* // eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {Object.entries(courses).map(([_, courseList], i) => (
                <Accordion
                    key={i}
                    sx={{
                        backgroundColor: "inherit",
                        my: "1em",
                        boxShadow: "none",
                        px: "0",
                    }}
                    slotProps={{ transition: { unmountOnExit: true } }}
                    disableGutters
                >
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon sx={{ color: "white" }} />}
                        aria-controls={`panel${i}-content`}
                        id={`panel${i}-header`}
                        sx={{
                            color: "white",
                            border: "1px solid #fff",
                            borderRadius: "10px",
                            m: "0",
                            mb: { xs: "1em", sm: "0" },
                        }}
                    >
                        <Typography>{`${i + 1}. Semester`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "repeat(1, minmax(0, 1fr))",
                                md: "repeat(auto-fit, minmax(400px, 1fr))",
                            },
                            gap: "1rem",
                            p: { xs: "0", sm: "1rem" },
                        }}
                    >
                        {courseList.map((course, j) => (
                            <Course key={j} {...course} />
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default CourseList;
