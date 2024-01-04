import { useEffect, useState } from "react";

const AboutMe = () => {
    const [aboutInfo, setAboutInfo] = useState("");
    useEffect(() => {
        fetch("https://api.jsonbin.io/v3/b/65948ae8dc746540188c2440", {
            headers: {
                "X-Master-Key":
                    "$2a$10$LnNgK7Uxoz6BCpJNaMhvaO3jblrLkznRnYoY645Y." + `${import.meta.env.VITE_ABOUT_ME_API_KEY}`,
                "X-Bin-Meta": "false",
            },
        })
            .then((response) => response.json())
            .then((data) => setAboutInfo(data.text));
    }, []);

    return (
        <section className="flex flex-col md:flex-row p-5 justify-center md:gap-2 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-400  bg-clip-text text-transparent">
            <h3 className="text-2xl md:text-4xl underline md:no-underline decoration-gray-500">Briefly aboue me</h3>
            <div className="text-lg md:text-xl">
                {aboutInfo && aboutInfo.split("\n").map((line, i) => <p key={i}>{line}</p>)}
            </div>
        </section>
    );
};

export default AboutMe;
