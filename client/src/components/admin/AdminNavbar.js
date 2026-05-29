import React from "react";
import toast from "react-hot-toast";

import {
    Link,
    useNavigate,
} from "react-router-dom";

const AdminNavbar = () => {

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
            text-3xl
            font-bold
            text-white
            tracking-wide
          "
                >
                    Flyora Admin
                </Link>

                {/* Links */}

                <div
                    className="
            flex
            items-center
            gap-6
          "
                >

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