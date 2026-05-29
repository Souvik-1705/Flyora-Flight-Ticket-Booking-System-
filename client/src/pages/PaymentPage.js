import React from 'react';
import toast from 'react-hot-toast';

import {
    useLocation,
    useNavigate
}
    from 'react-router-dom';
import { BASE_URL } from '../config';

const PaymentPage = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const {
        flight,
        passengers,
        classType,
        ticketPrice
    } = location.state;

    // total price
    const totalPrice =
        ticketPrice *
        passengers.length;

    const paymentHandler =
        async () => {

            try {

                // create order
                const res =
                    await fetch(
                        `${BASE_URL}/api/payments/create-order`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify({
                                amount: totalPrice,
                            }),

                        }
                    );

                const order =
                    await res.json();

                const options = {

                    key:
                        process.env.REACT_APP_RAZORPAY_KEY_ID,

                    amount:
                        order.amount,

                    currency:
                        order.currency,

                    name:
                        "Flyora",

                    description:
                        "Flight Booking Payment",

                    order_id:
                        order.id,

                    handler:
                        async function (response) {

                            try {

                                const userInfo =
                                    JSON.parse(
                                        localStorage.getItem(
                                            "userInfo"
                                        )
                                    );

                                const bookingRes =
                                    await fetch(

                                        `${BASE_URL}/api/bookings/create-booking`,

                                        {

                                            method: "POST",

                                            headers: {

                                                "Content-Type":
                                                    "application/json",

                                                Authorization:
                                                    `Bearer ${userInfo.token}`,

                                            },

                                            body: JSON.stringify({

                                                flightId:
                                                    flight._id,

                                                passengers,

                                                classType,

                                                totalPrice,

                                            }),

                                        }

                                    );

                                const bookingData =
                                    await bookingRes.json();

                                if (!bookingRes.ok) {

                                    alert(
                                        bookingData.message
                                    );

                                    return;

                                }

                                toast.success(
                                    "Payment & Booking Successful"
                                );

                                navigate("/my-bookings");

                            } catch (error) {

                                console.log(error);

                            }

                        },

                    theme: {
                        color: "#2563eb",
                    },

                };

                const razorpay =
                    new window.Razorpay(
                        options
                    );

                razorpay.open();

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
        px-6
        py-10
      "
        >

            <div
                className="
          max-w-4xl
          mx-auto
          grid
          md:grid-cols-2
          gap-8
        "
            >

                {/* Left */}

                <div
                    className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
          "
                >

                    <h1
                        className="
              text-3xl
              font-bold
              mb-6
            "
                    >
                        Booking Summary
                    </h1>

                    <div
                        className="
              space-y-4
            "
                    >

                        <div>

                            <p
                                className="
                  text-slate-400
                "
                            >
                                Airline
                            </p>

                            <h2
                                className="
                  text-xl
                  font-semibold
                "
                            >
                                {flight.airline}
                            </h2>

                        </div>

                        <div>

                            <p
                                className="
                  text-slate-400
                "
                            >
                                Route
                            </p>

                            <h2
                                className="
                  text-xl
                  font-semibold
                "
                            >
                                {flight.from}
                                {" → "}
                                {flight.to}
                            </h2>

                        </div>

                        <div>

                            <p
                                className="
                  text-slate-400
                "
                            >
                                Passengers
                            </p>

                            <h2
                                className="
                  text-xl
                  font-semibold
                "
                            >
                                {
                                    passengers.length
                                }
                            </h2>

                        </div>

                        <div>

                            <p
                                className="
          text-slate-400
        "
                            >
                                Class
                            </p>

                            <h2
                                className="
          text-xl
          font-semibold
        "
                            >
                                {classType}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div
                    className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            flex
            flex-col
            justify-between
          "
                >

                    <div>

                        <h1
                            className="
                text-3xl
                font-bold
                mb-6
              "
                        >
                            Payment
                        </h1>

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
                                Total Amount
                            </p>

                            <h2
                                className="
                  text-4xl
                  font-bold
                  text-blue-400
                "
                            >
                                ₹ {totalPrice}
                            </h2>

                        </div>

                    </div>

                    <button
                        onClick={paymentHandler}
                        className="
              mt-8
              w-full
              bg-blue-600
              hover:bg-blue-700
              transition
              duration-300
              py-4
              rounded-2xl
              font-bold
              text-lg
            "
                    >
                        Pay Now
                    </button>

                </div>

            </div>

        </div>

    );

};

export default PaymentPage;