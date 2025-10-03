import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return <div className="bg-gray-900 px-[0.475rem] md:px-10">{children}</div>;
};

export default Layout;
