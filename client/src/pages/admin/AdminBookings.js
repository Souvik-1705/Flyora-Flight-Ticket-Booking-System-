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
import { BASE_URL } from "../../config";

const AdminBookings = () => {

  const navigate =
    useNavigate();

  const [bookings,
    setBookings] =
    useState([]);

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

  }, [navigate]);

  // fetch bookings

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings =
    async () => {

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

            `${BASE_URL}/api/bookings/admin/all`,

            {

              headers: {

                Authorization:
                  `Bearer ${adminInfo.token}`,

              },

            }

          );

        const data =
          await res.json();

        setBookings(data);

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
          max-w-7xl
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
            All Bookings
          </h1>

          <p
            className="
              text-slate-400
              text-lg
            "
          >
            Manage and monitor
            all flight bookings.
          </p>

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
                      User
                    </th>

                    <th
                      className="
                        p-5
                      "
                    >
                      Flight
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
                      Passengers
                    </th>

                    <th
                      className="
                        p-5
                      "
                    >
                      Class
                    </th>

                    <th
                      className="
                        p-5
                      "
                    >
                      Total
                    </th>

                    <th
                      className="
                        p-5
                      "
                    >
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    bookings.map(
                      (booking) => {

                        // old broken booking skip

                        if (
                          !booking.flight
                        ) {

                          return null;

                        }

                        return (

                          <tr
                            key={booking._id}
                            className="
                              border-b
                              border-slate-800
                              hover:bg-slate-900/60
                              transition
                              duration-300
                            "
                          >

                            {/* User */}

                            <td
                              className="
                                p-5
                              "
                            >

                              <div>

                                <h3
                                  className="
                                    font-semibold
                                  "
                                >
                                  {
                                    booking.user
                                      ?.name
                                  }
                                </h3>

                                <p
                                  className="
                                    text-slate-400
                                    text-sm
                                  "
                                >
                                  {
                                    booking.user
                                      ?.email
                                  }
                                </p>

                              </div>

                            </td>

                            {/* Flight */}

                            <td
                              className="
                                p-5
                                font-semibold
                              "
                            >
                              {
                                booking.flight
                                  .airline
                              }
                            </td>

                            {/* Route */}

                            <td
                              className="
                                p-5
                              "
                            >
                              {
                                booking.flight
                                  .from
                              }

                              {" → "}

                              {
                                booking.flight
                                  .to
                              }
                            </td>

                            {/* Passengers */}

                            <td
                              className="
                                p-5
                              "
                            >
                              {
                                booking.passengers
                                  .length
                              }
                            </td>

                            {/* Class */}

                            <td
                              className="
                                p-5
                              "
                            >
                              {
                                booking.classType
                              }
                            </td>

                            {/* Total */}

                            <td
                              className="
                                p-5
                                text-green-400
                                font-semibold
                              "
                            >
                              ₹
                              {
                                booking.totalPrice
                              }
                            </td>

                            {/* Status */}

                            <td
                              className="
                                p-5
                              "
                            >

                              <span
                                className={

                                  booking
                                    .bookingStatus ===
                                    "Cancelled"

                                    ?

                                    `
                                      bg-red-500/20
                                      text-red-400
                                      px-4
                                      py-2
                                      rounded-xl
                                      text-sm
                                      font-semibold
                                    `

                                    :

                                    `
                                      bg-green-500/20
                                      text-green-400
                                      px-4
                                      py-2
                                      rounded-xl
                                      text-sm
                                      font-semibold
                                    `

                                }
                              >

                                {
                                  booking
                                    .bookingStatus
                                }

                              </span>

                            </td>

                          </tr>

                        );

                      }
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

export default AdminBookings;