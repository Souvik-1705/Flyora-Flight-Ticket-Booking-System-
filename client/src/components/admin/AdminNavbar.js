import React, { useState } from "react";
import toast from "react-hot-toast";

import {
    Link,
    useNavigate,
} from "react-router-dom";

const AdminNavbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate =
        useNavigate();

    const logoutHandler = () => {

        localStorage.removeItem(
            "adminInfo"
        );

        toast.success(
            "Logout Successful"
        );

        setTimeout(() => {

            navigate(
                "/admin/login"
            );

            window.location.reload();

        }, 1000);

    };

    return (

        <nav
            className="
        sticky
        top-0
        z-50
        bg-slate-950/95
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

                {/* Logo */}

                <Link
                    to="/admin/dashboard"
                    className="
  text-2xl
  md:text-3xl
  font-bold
  text-white
  tracking-wide

          "
                >
                    Flyora Admin
                </Link>

                <div className="md:hidden">

                    <button
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        className="
            text-white
            text-3xl
        "
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>

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

                            <div
                                className="
                    flex
                    flex-col
                    gap-4
                "
                            >

                                <Link
                                    to="/admin/dashboard"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                    className="
                        text-slate-300
                    "
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/admin/flights"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                    className="
                        text-slate-300
                    "
                                >
                                    Flights
                                </Link>

                                <Link
                                    to="/admin/bookings"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                    className="
                        text-slate-300
                    "
                                >
                                    Bookings
                                </Link>

                                <Link
                                    to="/admin/create-flight"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                    className="
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        text-center
                    "
                                >
                                    Create Flight
                                </Link>

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

                            </div>

                        </div>

                    )
                }

                {/* Links */}

                <div className="hidden md:flex items-center gap-6">

                    <Link
                        to="/admin/dashboard"
                        className="
              text-slate-300
              hover:text-white
              transition
              duration-300
              font-medium
            "
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/flights"
                        className="
              text-slate-300
              hover:text-white
              transition
              duration-300
              font-medium
            "
                    >
                        Flights
                    </Link>
                    <Link
                        to="/admin/bookings"
                        className="
    text-slate-300
    hover:text-white
    transition
    duration-300
    font-medium
  "
                    >
                        Bookings
                    </Link>

                    <Link
                        to="/admin/create-flight"
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
                        Create Flight
                    </Link>

                    <button
                        onClick={
                            logoutHandler
                        }
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

                </div>

            </div>

        </nav>

    );

};

export default AdminNavbar;