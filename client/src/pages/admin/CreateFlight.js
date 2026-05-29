import React,
{
  useEffect,
  useState
}
from "react";

import {
  useNavigate,
} from "react-router-dom";

import AdminNavbar
from "../../components/admin/AdminNavbar";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config";

const CreateFlight = () => {

  const navigate =
    useNavigate();

  // protect route

  useEffect(() => {

    const adminInfo =
      JSON.parse(
        localStorage.getItem(
          "adminInfo"
        )
      );

    if (!adminInfo) {

      navigate(
        "/admin/login"
      );

    }

  }, [navigate]);

  // form states

  const [airline,
    setAirline] =
    useState("");

  const [from,
    setFrom] =
    useState("");

  const [to,
    setTo] =
    useState("");

  const [departureTime,
    setDepartureTime] =
    useState("");

  const [arrivalTime,
    setArrivalTime] =
    useState("");

  const [duration,
    setDuration] =
    useState("");

  const [economyPrice,
    setEconomyPrice] =
    useState("");

  const [businessPrice,
    setBusinessPrice] =
    useState("");

  const [firstClassPrice,
    setFirstClassPrice] =
    useState("");

  const [availableSeats,
    setAvailableSeats] =
    useState("");

  const [date,
    setDate] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  // submit

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const adminInfo =
          JSON.parse(
            localStorage.getItem(
              "adminInfo"
            )
          );

        const res =
          await fetch(

            `${BASE_URL}/api/flights/create`,

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${adminInfo.token}`,

              },

              body: JSON.stringify({

                airline,

                from,

                to,

                departureTime,

                arrivalTime,

                duration,

                price: {

                  economy:
                    economyPrice,

                  business:
                    businessPrice,

                  firstClass:
                    firstClassPrice,

                },

                availableSeats,

                date,

              }),

            }

          );

        const data =
          await res.json();

        if (!res.ok) {

          toast.error(
            data.message
          );

          return;

        }

        toast.success(
          "Flight Created Successfully"
        );

        navigate(
          "/admin/flights"
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
        min-h-screen
        bg-slate-950
        text-white
      "
    >

      <AdminNavbar />

      <div
        className="
          max-w-5xl
          mx-auto
          px-6
          py-10
        "
      >

        {/* Top */}

        <div
          className="
            mb-10
          "
        >

          <h1
            className="
              text-5xl
              font-bold
              mb-4
            "
          >
            Create Flight
          </h1>

          <p
            className="
              text-slate-400
              text-lg
            "
          >
            Add a new flight
            to the system.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={
            submitHandler
          }
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
            shadow-2xl
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >

          {/* Airline */}

          <input
            type="text"
            placeholder="Airline"
            value={airline}
            onChange={(e) =>
              setAirline(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* From */}

          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) =>
              setFrom(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* To */}

          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) =>
              setTo(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* Date */}

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* Departure */}

          <input
            type="text"
            placeholder="Departure Time"
            value={departureTime}
            onChange={(e) =>
              setDepartureTime(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* Arrival */}

          <input
            type="text"
            placeholder="Arrival Time"
            value={arrivalTime}
            onChange={(e) =>
              setArrivalTime(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* Duration */}

          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) =>
              setDuration(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* Seats */}

          <input
            type="number"
            placeholder="Available Seats"
            value={availableSeats}
            onChange={(e) =>
              setAvailableSeats(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* Economy */}

          <input
            type="number"
            placeholder="Economy Price"
            value={economyPrice}
            onChange={(e) =>
              setEconomyPrice(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* Business */}

          <input
            type="number"
            placeholder="Business Price"
            value={businessPrice}
            onChange={(e) =>
              setBusinessPrice(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* First Class */}

          <input
            type="number"
            placeholder="First Class Price"
            value={firstClassPrice}
            onChange={(e) =>
              setFirstClassPrice(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* Submit */}

          <button
            type="submit"
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              duration-300
              rounded-xl
              py-3
              font-semibold
              shadow-lg
            "
          >

            {
              loading
                ? "Creating..."
                : "Create Flight"
            }

          </button>

        </form>

      </div>

    </div>

  );

};

export default CreateFlight;