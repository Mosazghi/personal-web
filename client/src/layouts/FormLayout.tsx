import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const FormLayout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-100 via-gray-300 to-gray-400 bg-clip-text text-transparent">
            {children}
        </div>
    );
};

export default FormLayout;
