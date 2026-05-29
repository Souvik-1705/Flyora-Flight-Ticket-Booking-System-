import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { BASE_URL } from '../config';

const Login = () => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const redirect =
    new URLSearchParams(
      location.search
    ).get("redirect") || "/";

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const res =
        await fetch(
          `${BASE_URL}/api/auth/login`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),

          }
        );

      const data = await res.json();

      if (!res.ok) {

        toast.error(data.message);

        return;

      }

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );
      
      toast.success("Login Successful");
      navigate(redirect);

    } catch (error) {

      console.log(error);

    }

  };

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
          w-full
          max-w-md
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-8
          shadow-2xl
        "
      >

        <div
          className="
            text-center
            mb-8
          "
        >

          <h1
            className="
              text-4xl
              font-bold
              text-white
              mb-3
            "
          >
            Welcome Back
          </h1>

          <p
            className="
              text-slate-400
            "
          >
            Login to continue your journey.
          </p>

        </div>

        <form
          onSubmit={submitHandler}
          className="
            space-y-5
          "
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
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
              text-white
              py-3
              rounded-xl
              font-semibold
              shadow-lg
            "
          >
            Login
          </button>

        </form>

        <p
          className="
            text-center
            text-slate-400
            mt-6
          "
        >
          New User?

          <Link
            to="/register"
            className="
              text-blue-400
              hover:text-blue-300
              ml-2
            "
          >
            Register
          </Link>
        </p>
        <div
          className="
    mt-5
    text-center
  "
        >

          <Link
            to="/admin/login"
            className="
      inline-flex
      items-center
      gap-2
      text-sm
      text-slate-400
      hover:text-blue-400
      transition
      duration-300
    "
          >

            <span>
              Want to login as an admin?
            </span>

          </Link>

        </div>

      </div>

    </div>

  );

};

export default Login;