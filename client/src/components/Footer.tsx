// create a map with link name and url

const links = [
    { name: "Github", url: "https://github.com/Mosazghi" },
    { name: "Linkedin", url: "https://www.linkedin.com/in/mosazghi-tesfazghi-8275a6275/" },
    { name: "Facebook", url: "https://www.facebook.com/mosazghi.yohannestesfazghi/" },
];

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full backdrop-blur-md text-slate-400 p-4">
            <div className="container mx-auto text-center">
                <ul className="flex justify-center gap-4">
                    {links.map((link, i) => (
                        <li key={i}>
                            <a className="hover:underline decoration-slate-50" target="_blank" href={link.url}>
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
