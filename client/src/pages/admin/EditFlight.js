import React,
{
  useEffect,
  useState
}
from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AdminNavbar
from "../../components/admin/AdminNavbar";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config";

const EditFlight = () => {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  // states

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

  }, []);

  // fetch flight

  useEffect(() => {

    fetchFlight();

  }, []);

  const fetchFlight =
    async () => {

      try {

        setLoading(true);

        const res =
          await fetch(

            `${BASE_URL}/api/flights/${id}`

          );

        const data =
          await res.json();

        setAirline(
          data.airline
        );

        setFrom(
          data.from
        );

        setTo(
          data.to
        );

        setDepartureTime(
          data.departureTime
        );

        setArrivalTime(
          data.arrivalTime
        );

        setDuration(
          data.duration
        );

        setEconomyPrice(
          data.price.economy
        );

        setBusinessPrice(
          data.price.business
        );

        setFirstClassPrice(
          data.price.firstClass
        );

        setAvailableSeats(
          data.availableSeats
        );

        setDate(
          data.date
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  // update flight

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

            `${BASE_URL}/api/flights/${id}`,

            {

              method: "PUT",

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
          "Flight Updated Successfully"
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
            Edit Flight
          </h1>

          <p
            className="
              text-slate-400
              text-lg
            "
          >
            Update flight details.
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
            "
          />

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
            "
          />

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
            "
          />

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
            "
          />

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
            "
          />

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
            "
          />

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
            "
          />

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
            "
          />

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
            "
          />

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
            "
          />

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
            "
          />

          {/* Button */}

          <button
            type="submit"
            className="
              bg-yellow-500
              hover:bg-yellow-600
              transition
              duration-300
              rounded-xl
              py-3
              font-semibold
              text-black
              shadow-lg
            "
          >

            {
              loading
                ? "Updating..."
                : "Update Flight"
            }

          </button>

        </form>

      </div>

    </div>

  );

};

export default EditFlight;