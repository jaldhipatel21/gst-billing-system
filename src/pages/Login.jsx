import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const res = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert("Login Successful");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="container mt-5">

            <div className="card p-4 mx-auto" style={{maxWidth:"400px"}}>

                <h2 className="text-center mb-4">
                    Admin Login
                </h2>

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;