const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full backdrop-blur-md text-slate-400 p-4">
            <div className="container mx-auto text-center">
                <a className="underline" href="https://github.com/Mosazghi">
                    Github{" "}
                </a>
                |
                <a className="underline" href="https://www.linkedin.com/in/mosazghi-tesfazghi-8275a6275/">
                    {" "}
                    Linkedin{" "}
                </a>
                |
                <a className="underline" href="https://www.facebook.com/mosazghi.yohannestesfazghi/">
                    {" "}
                    Facebook
                </a>
            </div>
        </footer>
    );
};

export default Footer;
