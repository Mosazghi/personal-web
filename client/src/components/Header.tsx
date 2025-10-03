const Header = () => {
    return (
        <header className="py-1.5 text-center flex flex-col items-center justify-center gap-2 mb-4">
            <h1 className="text-white text-[2rem] md:text-[3.75rem] font-bold">
                <a href="admin/login" className="text-inherit hover:text-inherit">
                    Mosazghi
                </a>{" "}
                Y. Tesfazghi
            </h1>
            <h5 className="text-blue-gray-100 text-[1.2rem] md:text-[1.7rem] font-normal">
                Electrical and Electronics Engineering, NTNU
            </h5>
        </header>
    );
};

export default Header;
