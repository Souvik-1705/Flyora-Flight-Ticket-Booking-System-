import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../config';

const FlightDetailsPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);

  const [loading, setLoading] = useState(false);



  const continueHandler = () => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate(`/login?redirect=/booking/${id}`);
    }
    else {
      navigate(`/booking/${id}`)
    }
  };

  useEffect(() => {

    const fetchFlight = async () => {

      try {

        setLoading(true);

        const res =
          await fetch(
            `${BASE_URL}/api/flights/${id}`
          );

        const data = await res.json();

        setFlight(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchFlight();

  }, []);

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

  if (!flight) {

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
          Flight not found
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
          max-w-5xl
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
            Flight Details
          </h1>

          <p
            className="
              text-slate-400
              text-lg
            "
          >
            Review your flight information
            before booking.
          </p>

        </div>

        {/* Flight Card */}

        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            overflow-hidden
            shadow-2xl
          "
        >

          {/* Top Section */}

          <div
            className="
              bg-gradient-to-r
              from-blue-600
              to-indigo-700
              p-8
            "
          >

            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-6
              "
            >

              <div>

                <h2
                  className="
                    text-4xl
                    font-bold
                    mb-2
                  "
                >
                  {flight.airline}
                </h2>

                <p
                  className="
                    text-xl
                    text-blue-100
                  "
                >
                  {flight.from}

                  <span
                    className="
                      mx-3
                      text-white
                    "
                  >
                    →
                  </span>

                  {flight.to}
                </p>

              </div>

              <div
                className="
                  bg-white/10
                  backdrop-blur-lg
                  px-6
                  py-4
                  rounded-2xl
                "
              >

                <p
                  className="
                    text-sm
                    text-blue-100
                    mb-1
                  "
                >
                  Ticket Price
                </p>

                <h2
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  Starting From
                  ₹ {flight.price.economy}
                </h2>

              </div>

            </div>

          </div>

          {/* Bottom Section */}

          <div
            className="
              p-8
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >

            <div
              className="
                bg-slate-800
                rounded-2xl
                p-5
              "
            >

              <p
                className="
                  text-slate-400
                  mb-2
                "
              >
                Departure Time
              </p>

              <h3
                className="
                  text-2xl
                  font-semibold
                "
              >
                {flight.departureTime}
              </h3>

            </div>

            <div
              className="
                bg-slate-800
                rounded-2xl
                p-5
              "
            >

              <p
                className="
                  text-slate-400
                  mb-2
                "
              >
                Arrival Time
              </p>

              <h3
                className="
                  text-2xl
                  font-semibold
                "
              >
                {flight.arrivalTime}
              </h3>

            </div>

            <div
              className="
                bg-slate-800
                rounded-2xl
                p-5
              "
            >

              <p
                className="
                  text-slate-400
                  mb-2
                "
              >
                Duration
              </p>

              <h3
                className="
                  text-2xl
                  font-semibold
                "
              >
                {flight.duration}
              </h3>

            </div>

            <div
              className="
                bg-slate-800
                rounded-2xl
                p-5
              "
            >

              <p
                className="
                  text-slate-400
                  mb-2
                "
              >
                Available Seats
              </p>

              <h3
                className="
                  text-2xl
                  font-semibold
                "
              >
                {flight.availableSeats}
              </h3>

            </div>

            <div
              className="
                bg-slate-800
                rounded-2xl
                p-5
                md:col-span-2
              "
            >

              <p
                className="
                  text-slate-400
                  mb-2
                "
              >
                Flight Class
              </p>

              <h3
                className="
                  text-2xl
                  font-semibold
                "
              >
                {flight.classType}
              </h3>

            </div>

          </div>

          {/* Button */}

          <div
            className="
              px-8
              pb-8
            "
          >

            <button
              onClick={continueHandler}
              className="
                w-full
                bg-white
                text-slate-900
                py-4
                rounded-2xl
                font-bold
                text-lg
                hover:bg-slate-200
                transition
                duration-300
                shadow-lg
              "
            >
              Continue Booking
            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default FlightDetailsPage;