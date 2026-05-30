import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config';

const HomePage = () => {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [flights, setFlights] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const searchHandler = async (e) => {

        e.preventDefault();

        setSearched(true);

        if (!from && !to && !date) {

            setFlights([]);

            return;

        }

        try {

            setLoading(true);

            let url =
                `${BASE_URL}/api/flights/search?from=${from}&to=${to}`;

            if (date) {

                url += `&date=${date}`;

            }
            console.log(url);

            const res = await fetch(url);

            const data = await res.json();

            setFlights(data);

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
                px-6
                py-10
            "
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                "
            >

                {/* Hero */}

                <div
                    className="
                    bg-gradient-to-r
                  from-blue-600
                  to-indigo-700
                    rounded-3xl
                    p-6
                    md:p-8
                    lg:p-10
                    shadow-2xl
                    mb-10
                    "
                >

                    <h1
                        className="
                        text-3xl
                        md:text-4xl
                        lg:text-5xl
                        font-bold
                        mb-4
                        "
                    >
                        Find Your Perfect Flight
                    </h1>

                    <p
                        className="
                        text-base
                        md:text-lg
                      text-blue-100
                        "
                    >
                        Search and book flights easily with Flyora.
                    </p>

                </div>

                {/* Search Form */}

                <form
                    onSubmit={searchHandler}
                    className="
    bg-slate-900
    border
    border-slate-800
    rounded-3xl
    p-5
    md:p-8
    shadow-xl
    mb-10
  "
                >

                    <div
                        className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-4
    gap-4
  "
                    >

                        {/* From */}

                        <input
                            type="text"
                            placeholder="From"
                            value={from}
                            onChange={(e) =>
                                setFrom(e.target.value)
                            }
                            className="
  w-full
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
                                setTo(e.target.value)
                            }
                            className="
                                w-full
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
                                setDate(e.target.value)
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


                        {/* Search Button */}

                        <button
                            type="submit"
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                transition
                                duration-300
                                px-8
                                py-3
                                rounded-xl
                                font-semibold
                                shadow-lg
                                h-[50px]
                            "
                        >
                            Search
                        </button>

                    </div>

                </form>

                {/* Flights */}

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
                                space-y-5
                            "
                        >
                            {searched && !loading && flights.length === 0 && (
                                <div className="text-center py-10">
                                    <h2 className="text-xl text-slate-400">
                                        No flights found
                                    </h2>
                                </div>
                            )}

                            {
                                flights.map((flight) => (

                                    <div
                                        key={flight._id}
                                        className="
                                            bg-slate-900
                                            border
                                            border-slate-800
                                            rounded-2xl
                                            p-6
                                            flex
                                            flex-col
                                            lg:flex-row
                                            lg:items-center
                                            lg:justify-between
                                            gap-6
                                            shadow-xl
                                        "
                                    >

                                        {/* Left */}

                                        <div
                                            className="
                                                flex
                                                flex-col
                                                gap-4
                                            "
                                        >

                                            <h2
                                                className="
                                                    text-2xl
                                                    font-bold
                                                "
                                            >
                                                {
                                                    flight.airline
                                                }
                                            </h2>

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                    text-lg
                                                "
                                            >

                                                <span>
                                                    {
                                                        flight.from
                                                    }
                                                </span>

                                                <span
                                                    className="
                                                        text-blue-400
                                                    "
                                                >
                                                    →
                                                </span>

                                                <span>
                                                    {
                                                        flight.to
                                                    }
                                                </span>

                                            </div>

                                        </div>

                                        {/* Middle */}

                                        <div
                                            className="
                                                flex
                                                flex-wrap
                                                gap-10
                                                text-slate-300
                                            "
                                        >

                                            {/* Date */}

                                            <div>

                                                <p
                                                    className="
                                                        text-sm
                                                        text-slate-500
                                                    "
                                                >
                                                    Date
                                                </p>

                                                <h3
                                                    className="
                                                        text-lg
                                                        font-semibold
                                                        text-white
                                                    "
                                                >
                                                    {
                                                        flight.date
                                                    }
                                                </h3>

                                            </div>

                                            {/* Departure */}

                                            <div>

                                                <p
                                                    className="
                                                        text-sm
                                                        text-slate-500
                                                    "
                                                >
                                                    Departure
                                                </p>

                                                <h3
                                                    className="
                                                        text-lg
                                                        font-semibold
                                                        text-white
                                                    "
                                                >
                                                    {
                                                        flight.departureTime
                                                    }
                                                </h3>

                                            </div>

                                            {/* Arrival */}

                                            <div>

                                                <p
                                                    className="
                                                        text-sm
                                                        text-slate-500
                                                    "
                                                >
                                                    Arrival
                                                </p>

                                                <h3
                                                    className="
                                                        text-lg
                                                        font-semibold
                                                        text-white
                                                    "
                                                >
                                                    {
                                                        flight.arrivalTime
                                                    }
                                                </h3>

                                            </div>

                                            {/* Price */}

                                            <div>

                                                <p
                                                    className="
                                                        text-sm
                                                        text-slate-500
                                                    "
                                                >
                                                    Price
                                                </p>

                                                <h3
                                                    className="
                                                        text-lg
                                                        font-semibold
                                                        text-green-400
                                                    "
                                                >
                                                    ₹
                                                    {
                                                        flight.price.economy
                                                    }
                                                </h3>

                                            </div>

                                            {/* Seats */}

                                            <div>

                                                <p
                                                    className="
                                                        text-sm
                                                        text-slate-500
                                                    "
                                                >
                                                    Seats
                                                </p>

                                                <h3
                                                    className="
                                                        text-lg
                                                        font-semibold
                                                        text-white
                                                    "
                                                >
                                                    {
                                                        flight.availableSeats
                                                    }
                                                </h3>

                                            </div>

                                        </div>

                                        {/* Right */}

                                        <Link
                                            to={`/flights/${flight._id}`}
                                            className="
                                                bg-blue-600
                                                hover:bg-blue-700
                                                text-white
                                                px-8
                                                py-3
                                                rounded-xl
                                                font-semibold
                                                transition
                                                duration-300
                                                text-center
                                                whitespace-nowrap
                                            "
                                        >
                                            Book Flight
                                        </Link>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </div>

    );

};

export default HomePage;