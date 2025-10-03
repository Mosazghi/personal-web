import { ArrowLeft } from "lucide-react";

function NoPage() {
    return (
        <div className="h-screen text-center flex flex-col justify-center items-center">
            <h2 className="text-4xl mb-2 ">404 Page Not Found</h2>
            <a
                href="/"
                className=" hover:underline flex items-center group hover:transform hover:scale-105 transition-all"
            >
                <ArrowLeft className="inline-block mr-1" />
                Go back to portfolio
            </a>
        </div>
    );
}

export default NoPage;
