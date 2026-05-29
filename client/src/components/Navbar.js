import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

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

                <div>

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

            </div>

        </nav>

    );

};

export default Navbar;