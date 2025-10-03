import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const FormLayout = ({ children }: LayoutProps) => {
    return (
        <div
            className="flex flex-col justify-center items-center h-screen text-transparent"
            style={{
                background: "linear-gradient(to bottom, #f7fafc, #e2e8f0, #cbd5e0)",
                WebkitBackgroundClip: "text",
            }}
        >
            {children}
        </div>
    );
};

export default FormLayout;
