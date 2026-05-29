import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/api/auth/adminLogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        email,
                        password
                    }
                )
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            localStorage.setItem(
                "adminInfo",
                JSON.stringify(data)
            );

            toast.success(
                "Admin Login Successful"
            );

            setTimeout(() => {

                navigate(
                    "/admin/dashboard"
                );

            }, 1000);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div
            className="
        min-h-screen
        bg-slate-950
        flex
        items-center
        justify-center
        px-6
      "
        >

            <div
                className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-10
          w-full
          max-w-md
          shadow-2xl
        "
            >

                <h1
                    className="
            text-4xl
            font-bold
            text-white
            mb-3
            text-center
          "
                >
                    Admin Login
                </h1>

                <p
                    className="
            text-slate-400
            text-center
            mb-8
          "
                >
                    Login to manage flights.
                </p>

                <form
                    onSubmit={
                        submitHandler
                    }
                    className="
            space-y-5
          "
                >

                    {/* Email */}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        className="
              w-full
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-blue-500
            "
                    />

                    {/* Password */}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="
              w-full
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-blue-500
            "
                    />

                    <button
                        type="submit"
                        className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              transition
              duration-300
              py-3
              rounded-xl
              text-white
              font-semibold
            "
                    >

                        {
                            loading
                                ? "Loading..."
                                : "Login"
                        }

                    </button>

                </form>

                {/* User Login */}

                <div
                    className="
            mt-6
            text-center
          "
                >

                    <Link
                        to="/login"
                        className="
              text-blue-400
              hover:text-blue-300
            "
                    >
                        Want to login as user?
                    </Link>

                </div>

            </div>

        </div>

    )
}

export default AdminLogin