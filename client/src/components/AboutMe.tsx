import { useEffect, useState } from "react";
import { request } from "../utils/fetch";
import LoadingStatus from "./LoadingStatus";

const AboutMe = () => {
    const [aboutInfo, setAboutInfo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: "GET",
            url: "https://api.npoint.io/7b57d163135f40a37a99",
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
        <section
            className="flex flex-col md:flex-row gap-2 justify-center text-transparent bg-white"
            style={{ WebkitBackgroundClip: "text" }}
        >
            <h3 className="text-[1.5rem] md:text-[2.5rem] italic font-bold">Briefly about me</h3>
            <div className="cursor-text">
                {aboutInfo &&
                    aboutInfo.split("\n").map((line, i) => {
                        console.log("line", line);
                        return (
                            <p
                                key={i}
                                className="text-[1.125rem] md:text-[1.125rem] [&_a]:underline [&_a]:decoration-white [&_a]:text-inherit"
                            >
                                {i !== 0 && <br />}
                                {/* Render the line as HTML */}
                                <span dangerouslySetInnerHTML={{ __html: line }} />
                            </p>
                        );
                    })}
            </div>
        </section>
    );
};

export default AboutMe;
