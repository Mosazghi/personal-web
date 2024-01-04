import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="transition-all ease-out duration-300 from-gray-900 to-gray-600 bg-gradient-to-b min-h-screen md:px-10">
            {children}
        </div>
    );
};

export default Layout;
