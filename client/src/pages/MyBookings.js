import React,
{
  useEffect,
  useState,
  useCallback
}
  from 'react';

import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { BASE_URL } from '../config';

const MyBookings = () => {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );


  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/api/bookings/my`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  const cancelBooking = async (id) => {

    try {

      const res = await fetch(

        `${BASE_URL}/api/bookings/cancel/${id}`,

        {
          method: "PUT",

          headers: {

            Authorization:
              `Bearer ${userInfo.token}`,

          },

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
        "Booking Cancelled"
      );

      fetchBookings();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteBooking = async (id) => {

    try {

      const res = await fetch(

        `${BASE_URL}/api/bookings/${id}`,

        {

          method: "DELETE",

          headers: {

            Authorization:
              `Bearer ${userInfo.token}`,

          },

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
        "Booking Deleted"
      );

      fetchBookings();

    } catch (error) {

      console.log(error);

    }

  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    fetchBookings();



  }, [fetchBookings]);

  if (!userInfo) {

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
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-10
          text-center
          max-w-xl
          w-full
        "
        >

          <h1
            className="
            text-4xl
            font-bold
            text-white
            mb-4
          "
          >
            Login Required
          </h1>

          <p
            className="
            text-slate-400
            text-lg
            mb-8
          "
          >
            Please login first
            to view your bookings.
          </p>

          <Link
            to="/login"
            className="
            inline-block
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            py-3
            rounded-2xl
            font-semibold
            transition
            duration-300
          "
          >
            Go To Login
          </Link>

        </div>

      </div>

    );

  }

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          bg-slate-950
          flex
          items-center
          justify-center
          text-white
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Loading...
        </h1>

      </div>

    );

  }

  return (

    <div
      className="
        min-h-screen
        bg-slate-950
        text-white
        px-6
        py-10
      "
    >

      <div
        className="
          max-w-6xl
          mx-auto
        "
      >

        {/* Heading */}

        <div
          className="
            mb-10
          "
        >

          <h1
            className="
              text-5xl
              font-bold
              mb-3
            "
          >
            My Bookings
          </h1>

          <p
            className="
              text-slate-400
              text-lg
            "
          >
            View all your booked flights.
          </p>

        </div>

        {/* No Bookings */}

        {
          bookings.length === 0 && (

            <div
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-10
                text-center
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                  mb-3
                "
              >
                No Bookings Found
              </h2>

              <p
                className="
                  text-slate-400
                "
              >
                You have not booked
                any flights yet.
              </p>

            </div>

          )
        }

        {/* Booking Cards */}

        <div
          className="
    grid
    lg:grid-cols-2
    gap-8
  "
        >
          {bookings.map((booking) => {
            if (!booking.flight) return null;

            return (
              <div
                key={booking._id}
                className="
          bg-slate-900/80
          backdrop-blur-lg
          border
          border-slate-800
          rounded-3xl
          overflow-hidden
          shadow-2xl
          hover:border-blue-500
          hover:-translate-y-1
          transition-all
          duration-300
        "
              >
                {/* Header */}

                <div
                  className="
            flex
            justify-between
            items-center
            p-6
            border-b
            border-slate-800
          "
                >
                  <div>
                    <h2
                      className="
                text-2xl
                font-bold
              "
                    >
                      {booking.flight.airline}
                    </h2>

                    <p className="text-slate-400">
                      Flight #{booking.flight.flightNumber}
                    </p>
                  </div>

                  <span
                    className={
                      booking.bookingStatus === "Cancelled"
                        ? `
        px-4 py-2 rounded-full
        bg-red-500/20
        text-red-400
        text-sm font-semibold
      `
                        : `
        px-4 py-2 rounded-full
        bg-green-500/20
        text-green-400
        text-sm font-semibold
      `
                    }
                  >
                    {booking.bookingStatus}
                  </span>
                </div>

                {/* Route */}

                <div className="p-8">
                  <div
                    className="
              flex
              items-center
              justify-between
            "
                  >
                    <div className="text-center">
                      <h3
                        className="
                  text-4xl
                  font-bold
                "
                      >
                        {booking.flight.from}
                      </h3>

                      <p className="text-slate-400 mt-2">
                        {booking.flight.departureTime}
                      </p>
                    </div>

                    <div
                      className="
                flex-1
                mx-6
                flex
                items-center
              "
                    >
                      <div className="h-[2px] bg-slate-700 flex-1"></div>

                      <span
                        className="
                  mx-4
                  text-3xl
                "
                      >
                        ✈
                      </span>

                      <div className="h-[2px] bg-slate-700 flex-1"></div>
                    </div>

                    <div className="text-center">
                      <h3
                        className="
                  text-4xl
                  font-bold
                "
                      >
                        {booking.flight.to}
                      </h3>

                      <p className="text-slate-400 mt-2">
                        {booking.flight.arrivalTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}

                <div
                  className="
            border-t
            border-dashed
            border-slate-700
            p-6
          "
                >
                  <div
                    className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-6
            "
                  >
                    <div>
                      <p
                        className="
                  text-slate-500
                  text-sm
                "
                      >
                        Passengers
                      </p>

                      <h4
                        className="
                  text-lg
                  font-semibold
                "
                      >
                        {booking.passengers.length}
                      </h4>
                    </div>

                    <div>
                      <p
                        className="
                  text-slate-500
                  text-sm
                "
                      >
                        Class
                      </p>

                      <h4
                        className="
                  text-lg
                  font-semibold
                  capitalize
                "
                      >
                        {booking.classType}
                      </h4>
                    </div>

                    <div>
                      <p
                        className="
                  text-slate-500
                  text-sm
                "
                      >
                        Booking ID
                      </p>

                      <h4
                        className="
                  text-sm
                  font-medium
                "
                      >
                        {booking._id.slice(-8)}
                      </h4>
                    </div>

                    <div>
                      <p
                        className="
                  text-slate-500
                  text-sm
                "
                      >
                        Total Paid
                      </p>

                      <h4
                        className="
                  text-xl
                  font-bold
                  text-blue-400
                "
                      >
                        ₹{booking.totalPrice}
                      </h4>
                    </div>

                  </div>
                  {/* Buttons */}

                  <div
                    className="
      mt-6
      pt-6
      border-t
      border-slate-800
    "
                  >
                    {booking.bookingStatus === "Booked" ? (

                      <button
                        onClick={() =>
                          cancelBooking(
                            booking._id
                          )
                        }
                        className="
          w-full
          bg-red-600
          hover:bg-red-700
          py-3
          rounded-xl
          font-semibold
          transition
        "
                      >
                        Cancel Booking
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          deleteBooking(
                            booking._id
                          )
                        }
                        className="
          w-full
          bg-slate-700
          hover:bg-slate-600
          py-3
          rounded-xl
          font-semibold
          transition
        "
                      >
                        Delete Booking
                      </button>

                    )}
                  </div>
                </div>

              </div>

            );

          })}

        </div>


      </div>

    </div>

  );

};

export default MyBookings;