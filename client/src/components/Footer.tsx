const links = [
    { name: "Github", url: "https://github.com/Mosazghi" },
    { name: "Linkedin", url: "https://www.linkedin.com/in/mosazghi-tesfazghi-8275a6275/" },
    { name: "Facebook", url: "https://www.facebook.com/mosazghi.yohannestesfazghi/" },
];

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full backdrop-blur-[10px]">
            <div className="mx-auto w-min text-center">
                <ul className="flex justify-center list-none p-0">
                    {links.map((link, i) => (
                        <li key={i} className="w-auto px-4">
                            <a
                                className="no-underline text-blue-gray-50 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={link.url}
                            >
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
