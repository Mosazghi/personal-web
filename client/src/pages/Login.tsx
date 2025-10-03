import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import cookies from "../utils/cookies";
import { request } from "../utils/fetch";
import getApiPath from "../utils/getApiPath";

export default function Login() {
    const [error, setError] = useState<string>("");
    const authUrl = getApiPath() + import.meta.env.VITE_ADMIN_LOGIN_URL;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const config = {
            url: authUrl,
            method: "POST",
            data: {
                username: data.get("username"),
                password: data.get("password"),
            },
        };
        setLoading(true);
        request(config)
            .then((data) => {
                if (data) {
                    cookies.set("TOKEN", data.token, { path: "/" });
                    navigate("/admin/dashboard");
                } else {
                    setError("Invalid credentials");
                }
            })
            .catch(() => {
                return new Error();
            })
            .finally(() => setLoading(false));
    };

    if (cookies.get("TOKEN")) {
        return <Navigate to="/admin/dashboard" />;
    }

    return (
        <div className="max-w-xs w-full bg-inherit border-2 border-white rounded-[20px]">
            <div className="mt-8 flex flex-col items-center">
                <h1 className="text-xl text-white">Sign in</h1>
                <hr className="w-[90%] border-white" />
                <form onSubmit={handleSubmit} noValidate className="w-[90%] mt-1 mb-1">
                    <div className="flex flex-col justify-center">
                        <p className="py-1 text-white">Username</p>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            required
                            className="w-full px-3 py-2 border border-white bg-transparent text-white rounded-md placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div className="flex flex-col justify-center mb-3">
                        <p className="py-1 text-white">Password</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            required
                            className="w-full px-3 py-2 border border-white bg-transparent text-white rounded-md placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    {error && <p className="text-red-500 mb-2 -mt-1">{error}</p>}
                    <Button type="submit" fullWidth darkMode text={loading ? "Loading..." : "Sign in"} />
                    <a href="/" className="no-underline">
                        <p className="text-blue-gray-200 mt-2 text-right">Return to portfolio</p>
                    </a>
                </form>
            </div>
        </div>
    );
}
