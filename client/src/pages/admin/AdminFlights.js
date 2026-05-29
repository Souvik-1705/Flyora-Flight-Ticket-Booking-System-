import React,
{
  useEffect,
  useState
}
from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import AdminNavbar
from "../../components/admin/AdminNavbar";
import { BASE_URL } from "../../config";

const AdminFlights = () => {

  const navigate =
    useNavigate();

  const [flights,
    setFlights] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  // protect admin route

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

  // fetch flights

  useEffect(() => {

    fetchFlights();

  }, []);

  const fetchFlights =
    async () => {

      try {

        setLoading(true);

        const res =
          await fetch(

            `${BASE_URL}/api/flights`

          );

        const data =
          await res.json();

        setFlights(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  // delete flight

  const deleteHandler =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this flight?"
        );

      if (!confirmDelete) {
        return;
      }

      try {

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

              method: "DELETE",

              headers: {

                Authorization:
                  `Bearer ${adminInfo.token}`,

              },

            }

          );

        const data =
          await res.json();

        alert(
          data.message
        );

        fetchFlights();

      } catch (error) {

        console.log(error);

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
          max-w-7xl
          mx-auto
          px-6
          py-10
        "
      >

        {/* Top */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
            mb-10
          "
        >

          <div>

            <h1
              className="
                text-5xl
                font-bold
                mb-3
              "
            >
              Manage Flights
            </h1>

            <p
              className="
                text-slate-400
                text-lg
              "
            >
              Edit, delete and
              manage all flights.
            </p>

          </div>

          <Link
            to="/admin/create-flight"
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              duration-300
              px-6
              py-3
              rounded-2xl
              font-semibold
              shadow-lg
              text-center
            "
          >
            + Create Flight
          </Link>

        </div>

        {/* Loading */}

        {
          loading ? (

            <div
              className="
                flex
                justify-center
                items-center
                py-20
              "
            >

              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                Loading...
              </h2>

            </div>

          ) : (

            <div
              className="
                overflow-x-auto
              "
            >

              <table
                className="
                  w-full
                  border-collapse
                "
              >

                <thead>

                  <tr
                    className="
                      bg-slate-900
                      border-b
                      border-slate-800
                    "
                  >

                    <th
                      className="
                        p-5
                        
                      "
                    >
                      Airline
                    </th>

                    <th
                      className="
                        p-5
                        
                      "
                    >
                      Route
                    </th>

                    <th
                      className="
                        p-5
                        
                      "
                    >
                      Date
                    </th>

                    <th
                      className="
                        p-5
                        
                      "
                    >
                      Economy
                    </th>

                    <th
                      className="
                        p-5
                        
                      "
                    >
                      Seats
                    </th>

                    <th
                      className="
                        p-5
                        text-left
                      "
                    >
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    flights.map(
                      (flight) => (

                        <tr
                          key={flight._id}
                          className="
                            border-b
                            border-slate-800
                            hover:bg-slate-900/60
                            transition
                            duration-300
                          "
                        >

                          {/* Airline */}

                          <td
                            className="
                              p-5
                              font-semibold
                            "
                          >
                            {
                              flight.airline
                            }
                          </td>

                          {/* Route */}

                          <td
                            className="
                              p-5
                            "
                          >
                            {
                              flight.from
                            }

                            {" → "}

                            {
                              flight.to
                            }
                          </td>

                          {/* Date */}

                          <td
                            className="
                              p-5
                            "
                          >
                            {
                              flight.date
                            }
                          </td>

                          {/* Price */}

                          <td
                            className="
                              p-5
                              text-green-400
                              font-semibold
                            "
                          >
                            ₹
                            {
                              flight.price
                                .economy
                            }
                          </td>

                          {/* Seats */}

                          <td
                            className="
                              p-5
                            "
                          >
                            {
                              flight.availableSeats
                            }
                          </td>

                          {/* Actions */}

                          <td
                            className="
                              p-5
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              {/* Edit */}

                              <Link
                                to={`/admin/edit-flight/${flight._id}`}
                                className="
                                  bg-yellow-500
                                  hover:bg-yellow-600
                                  transition
                                  duration-300
                                  px-4
                                  py-2
                                  rounded-xl
                                  font-semibold
                                  text-black
                                "
                              >
                                Edit
                              </Link>

                              {/* Delete */}

                              <button
                                onClick={() =>
                                  deleteHandler(
                                    flight._id
                                  )
                                }
                                className="
                                  bg-red-600
                                  hover:bg-red-700
                                  transition
                                  duration-300
                                  px-4
                                  py-2
                                  rounded-xl
                                  font-semibold
                                "
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          )
        }

      </div>

    </div>

  );

};

export default AdminFlights;