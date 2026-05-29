import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const Register = () => {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const res =
        await fetch(
          `${BASE_URL}/api/auth/register`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name,
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

      navigate("/");
      toast.success("Registration Successful");

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
            Create Account
          </h1>

          <p
            className="
              text-slate-400
            "
          >
            Join Flyora and book your
            next journey.
          </p>

        </div>

        <form
          onSubmit={submitHandler}
          className="
            space-y-5
          "
        >

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
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
            Register
          </button>

        </form>

        <p
          className="
            text-center
            text-slate-400
            mt-6
          "
        >
          Already have an account?

          <Link
            to="/login"
            className="
              text-blue-400
              hover:text-blue-300
              ml-2
            "
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

};

export default Register;