import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "../styles/LoginForm.css"; 

const LoginForm = () => {
    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("cityslicka");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = await loginUser(email, password);
            localStorage.setItem("token", token);
            toast.success("Login successful! Redirecting...", {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                navigate("/users"); // Redirect after a short delay
            }, 2000);
        } catch (err) {
            toast.error(err.message || "Login failed!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="login-container poppins-semibold">
            <ToastContainer /> {/* Toast notifications container */}
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
