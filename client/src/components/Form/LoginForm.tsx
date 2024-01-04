import axios from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookies from "../../utils/cookies";
import getApiPath from "../../utils/getApiPath";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const authUrl = getApiPath() + import.meta.env.VITE_ADMIN_LOGIN_URL;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const configuration = {
            method: "post",
            url: authUrl,
            data: {
                username,
                password,
            },
        };

        axios(configuration)
            .then((res) => {
                cookies.set("TOKEN", res.data.token, {
                    path: "/",
                });
                navigate("/admin/adminDashboard");
            })
            .catch(() => {
                return new Error();
            });
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
            <div className="flex flex-col justify-center">
                <label htmlFor="navn" className="text-lg py-1">
                    Navn
                </label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-2 text-black rounded-md p-1"
                    type="text"
                    id="navn"
                    name="username"
                    placeholder="username"
                />
            </div>
            <div className="flex flex-col justify-center">
                <label htmlFor="pass" className="text-lg py-1">
                    Passord
                </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2 text-black rounded-md p-1"
                    type="password"
                    id="pass"
                    name="password"
                    placeholder="password"
                />
            </div>
            <button
                onClick={(e) => handleSubmit(e)}
                className="bg-gradient-to-b from-gray-100 via-gray-300 to-gray-400 bg-clip-text text-transparent shadow-md border-2 w-full text-white p-1 rounded-lg mt-3"
                type="submit"
            >
                Login
            </button>
            <Link to={"/"} className="ms-36">
                Return
            </Link>
        </form>
    );
};

export default LoginForm;
