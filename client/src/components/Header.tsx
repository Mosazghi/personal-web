import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="px-10 mb-5 md:mb-10">
            <h1 className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text text-3xl md:text-6xl text-center font-bold py-2">
                <Link className="hover:underline decoration-secondary" to="admin/login">
                    Mosazghi
                </Link>
                {" | "} Electrical Engineering, NTNU
            </h1>
        </header>
    );
};

export default Header;
