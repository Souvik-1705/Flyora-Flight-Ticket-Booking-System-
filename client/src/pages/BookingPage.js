import React, { useEffect, useState } from 'react';
import {
    useNavigate,
    useParams
} from 'react-router-dom';
import { BASE_URL } from '../config';

const BookingPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [flight, setFlight] =
        useState(null);


    const [classType, setClassType] =
        useState("Economy");

    // passengers array
    const [passengers, setPassengers] =
        useState([
            {
                fullName: "",
                age: "",
                nationality: "",
            },
        ]);


    useEffect(() => {

        // fetch flight
        const fetchFlight = async () => {

            try {

                const res =
                    await fetch(
                        `${BASE_URL}/api/flights/${id}`
                    );

                const data = await res.json();

                setFlight(data);

            } catch (error) {

                console.log(error);

            }

        };


        fetchFlight();

    }, [id]);

    // add passenger
    const addPassengerHandler = () => {

        setPassengers([

            ...passengers,

            {
                fullName: "",
                age: "",
                nationality: "",
            }

        ]);

    };

    // remove passenger
    const removePassengerHandler =
        (index) => {

            const updatedPassengers =
                passengers.filter(
                    (_, i) => i !== index
                );

            setPassengers(updatedPassengers);

        };

    // input change
    const changeHandler = (
        index,
        field,
        value
    ) => {

        const updatedPassengers =
            [...passengers];

        updatedPassengers[index][field] =
            value;

        setPassengers(updatedPassengers);

    };

    let ticketPrice = 0;

    if (classType === "Economy") {

        ticketPrice =
            flight?.price?.economy;

    }

    if (classType === "Business") {

        ticketPrice =
            flight?.price?.business;

    }

    if (classType === "First Class") {

        ticketPrice =
            flight?.price?.firstClass;

    }
    // submit booking
    const submitHandler = (e) => {

        e.preventDefault();

        navigate("/payment", {

            state: {

                flight,

                passengers,

                classType,

                ticketPrice

            }

        });

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
                        Complete Your Booking
                    </h1>

                    <p
                        className="
              text-slate-400
            "
                    >
                        Add passenger details
                        carefully before booking.
                    </p>

                </div>

                {/* Flight Summary */}

                {
                    flight && (

                        <div
                            className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-6
                mb-8
              "
                        >

                            <div
                                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                "
                            >

                                <div>

                                    <h2
                                        className="
                      text-3xl
                      font-bold
                      mb-2
                    "
                                    >
                                        {flight.airline}
                                    </h2>

                                    <p
                                        className="
                      text-xl
                      text-slate-300
                    "
                                    >
                                        {flight.from}

                                        <span
                                            className="
                        mx-2
                        text-blue-400
                      "
                                        >
                                            →
                                        </span>

                                        {flight.to}
                                    </p>

                                </div>

                                <div>

                                    <h2
                                        className="
                      text-3xl
                      font-bold
                      text-blue-400
                    "
                                    >
                                        ₹ {ticketPrice}
                                    </h2>

                                    <p
                                        className="
                      text-slate-400
                    "
                                    >
                                        Per Passenger
                                    </p>

                                    <div className="relative mt-4">

                                        <select
                                            value={classType}
                                            onChange={(e) =>
                                                setClassType(e.target.value)
                                            }
                                            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            px-4
            py-3
            pr-12
            appearance-none
            outline-none
            text-white
            cursor-pointer
        "
                                        >
                                            <option value="Economy">
                                                Economy
                                            </option>

                                            <option value="Business">
                                                Business
                                            </option>

                                            <option value="First Class">
                                                First Class
                                            </option>

                                        </select>

                                        <div
                                            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            pointer-events-none
            text-slate-400
            text-lg
        "
                                        >
                                            ▼
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )
                }

                {/* Form */}

                <form
                    onSubmit={submitHandler}
                    className="
            space-y-8
          "
                >

                    {/* Passenger Forms */}

                    {
                        passengers.map(
                            (
                                passenger,
                                index
                            ) => (

                                <div
                                    key={index}
                                    className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-6
                    space-y-5
                  "
                                >

                                    <div
                                        className="
                      flex
                      items-center
                      justify-between
                    "
                                    >

                                        <h2
                                            className="
                        text-2xl
                        font-bold
                      "
                                        >
                                            Passenger
                                            {" "}
                                            {index + 1}
                                        </h2>

                                        {
                                            passengers.length > 1 && (

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removePassengerHandler(
                                                            index
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
                                                    Remove
                                                </button>

                                            )
                                        }

                                    </div>

                                    {/* Full Name */}

                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={
                                            passenger.fullName
                                        }
                                        onChange={(e) =>
                                            changeHandler(
                                                index,
                                                "fullName",
                                                e.target.value
                                            )
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

                                    {/* Age */}

                                    <input
                                        type="number"
                                        placeholder="Age"
                                        value={
                                            passenger.age
                                        }
                                        onChange={(e) =>
                                            changeHandler(
                                                index,
                                                "age",
                                                e.target.value
                                            )
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

                                    {/* Nationality */}

                                    <input
                                        type="text"
                                        placeholder="Nationality"
                                        value={
                                            passenger.nationality
                                        }
                                        onChange={(e) =>
                                            changeHandler(
                                                index,
                                                "nationality",
                                                e.target.value
                                            )
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

                                </div>

                            )
                        )
                    }

                    {/* Add Passenger Button */}

                    <button
                        type="button"
                        onClick={addPassengerHandler}
                        className="
              w-full
              bg-slate-800
              hover:bg-slate-700
              transition
              duration-300
              py-4
              rounded-2xl
              font-bold
              text-lg
              border
              border-slate-700
            "
                    >
                        + Add Passenger
                    </button>

                    {/* Total Price */}

                    {
                        flight && (

                            <div
                                className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-3xl
                  p-6
                  flex
                  items-center
                  justify-between
                "
                            >

                                <h2
                                    className="
                    text-2xl
                    font-bold
                  "
                                >
                                    Total Price
                                </h2>

                                <h2
                                    className="
                    text-3xl
                    font-bold
                    text-blue-400
                  "
                                >
                                    ₹
                                    {" "}
                                    {
                                        ticketPrice *
                                        passengers.length
                                    }
                                </h2>

                            </div>

                        )
                    }

                    {/* Submit Button */}

                    <button
                        type="submit"
                        className="
      w-full
      bg-blue-600
      hover:bg-blue-700
      transition
      duration-300
      py-4
      rounded-2xl
      font-bold
      text-lg
      shadow-xl
   "
                    >
                        Continue To Payment
                    </button>

                </form>

            </div>

        </div>

    );

};

export default BookingPage;