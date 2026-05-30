import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const logoutHandler = () => {

        localStorage.removeItem("userInfo");

        toast.success(
            "Logout Successful"
        );

        navigate("/login");

    }

    return (

        <nav
            className="
        sticky
        top-0
        z-50
        bg-slate-950/90
        backdrop-blur-lg
        border-b
        border-slate-800
      "
        >

            <div
                className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
            >

                <div>

                    <Link
                        to="/"
                        className="
              text-3xl
              font-bold
              text-white
              tracking-wide
            "
                    >
                        Flyora
                    </Link>

                </div>

                <div className="md:hidden">

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white text-3xl"
                    >
                        ☰
                    </button>

                </div>

                <div className="hidden md:block">

                    <ul
                        className="
            flex
            items-center
            gap-6
        "
                    >

                        <li>
                            <Link
                                to="/"
                                className="
                    text-slate-300
                    hover:text-white
                    transition
                    duration-300
                    font-medium
                "
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/my-bookings"
                                className="
                    text-slate-300
                    hover:text-white
                    transition
                    duration-300
                    font-medium
                "
                            >
                                My Bookings
                            </Link>
                        </li>

                        {
                            userInfo ? (
                                <li>
                                    <button
                                        onClick={logoutHandler}
                                        className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-5
                            py-2.5
                            rounded-xl
                            font-semibold
                            transition
                            duration-300
                            shadow-lg
                        "
                                    >
                                        Logout
                                    </button>
                                </li>
                            ) : (
                                <li>
                                    <Link
                                        to="/login"
                                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-5
                            py-2.5
                            rounded-xl
                            font-semibold
                            transition
                            duration-300
                            shadow-lg
                        "
                                    >
                                        Login
                                    </Link>
                                </li>
                            )
                        }

                    </ul>

                </div>

                {
                    menuOpen && (

                        <div
                            className="
                md:hidden
                absolute
                top-full
                left-0
                w-full
                bg-slate-900
                border-t
                border-slate-800
                px-6
                py-5
            "
                        >

                            <ul
                                className="
                    flex
                    flex-col
                    gap-5
                "
                            >

                                <li>

                                    <Link
                                        to="/"
                                        onClick={() => setMenuOpen(false)}
                                        className="text-slate-300"
                                    >
                                        Home
                                    </Link>

                                </li>

                                <li>

                                    <Link
                                        to="/my-bookings"
                                        onClick={() => setMenuOpen(false)}
                                        className="text-slate-300"
                                    >
                                        My Bookings
                                    </Link>

                                </li>

                                {
                                    userInfo ? (

                                        <button
                                            onClick={() => {
                                                setMenuOpen(false);
                                                logoutHandler();
                                            }}
                                            className="
                                bg-red-600
                                text-white
                                px-4
                                py-2
                                rounded-lg
                            "
                                        >
                                            Logout
                                        </button>

                                    ) : (

                                        <Link
                                            to="/login"
                                            onClick={() => setMenuOpen(false)}
                                            className="
                                bg-blue-600
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                text-center
                            "
                                        >
                                            Login
                                        </Link>

                                    )
                                }

                            </ul>

                        </div>

                    )
                }

            </div >

        </nav >

    );

};

export default Navbar;