import React,
{
    useEffect,
    useState
}
from "react";

import AdminNavbar
from "../../components/admin/AdminNavbar";

import {
    useNavigate
}
from "react-router-dom";
import { BASE_URL } from "../../config";

const AdminDashboard = () => {

    const navigate =
        useNavigate();

    const [stats,
        setStats] =
        useState(null);

    const [loading,
        setLoading] =
        useState(false);

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

            return;

        }

        fetchDashboardStats();

    }, [navigate]);

    const fetchDashboardStats =
        async () => {

            try {

                setLoading(true);

                const res =
                    await fetch(

                        `${BASE_URL}/api/admin/dashboard`

                    );

                const data =
                    await res.json();

                setStats(data);

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

                {/* Header */}

                <div
                    className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-3xl
                        p-10
                        shadow-2xl
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
                        Admin Dashboard
                    </h1>

                    <p
                        className="
                            text-slate-400
                            text-lg
                        "
                    >
                        Manage flights,
                        bookings and users.
                    </p>

                </div>

                {
                    loading ? (

                        <div
                            className="
                                text-center
                                py-20
                            "
                        >

                            <h2
                                className="
                                    text-3xl
                                    font-bold
                                "
                            >
                                Loading...
                            </h2>

                        </div>

                    ) : (

                        <>

                            {/* Stats Cards */}

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    md:grid-cols-2
                                    lg:grid-cols-4
                                    gap-6
                                "
                            >

                                {/* Flights */}

                                <div
                                    className="
                                        bg-slate-900
                                        border
                                        border-slate-800
                                        rounded-3xl
                                        p-6
                                        shadow-xl
                                    "
                                >

                                    <p
                                        className="
                                            text-slate-400
                                            mb-2
                                        "
                                    >
                                        Total Flights
                                    </p>

                                    <h2
                                        className="
                                            text-5xl
                                            font-bold
                                        "
                                    >
                                        {
                                            stats?.totalFlights || 0
                                        }
                                    </h2>

                                </div>

                                {/* Bookings */}

                                <div
                                    className="
                                        bg-slate-900
                                        border
                                        border-slate-800
                                        rounded-3xl
                                        p-6
                                        shadow-xl
                                    "
                                >

                                    <p
                                        className="
                                            text-slate-400
                                            mb-2
                                        "
                                    >
                                        Total Bookings
                                    </p>

                                    <h2
                                        className="
                                            text-5xl
                                            font-bold
                                        "
                                    >
                                        {
                                            stats?.totalBookings || 0
                                        }
                                    </h2>

                                </div>

                                {/* Active */}

                                <div
                                    className="
                                        bg-slate-900
                                        border
                                        border-slate-800
                                        rounded-3xl
                                        p-6
                                        shadow-xl
                                    "
                                >

                                    <p
                                        className="
                                            text-slate-400
                                            mb-2
                                        "
                                    >
                                        Active Bookings
                                    </p>

                                    <h2
                                        className="
                                            text-5xl
                                            font-bold
                                            text-green-400
                                        "
                                    >
                                        {
                                            stats?.activeBookings || 0
                                        }
                                    </h2>

                                </div>

                                {/* Revenue */}

                                <div
                                    className="
                                        bg-slate-900
                                        border
                                        border-slate-800
                                        rounded-3xl
                                        p-6
                                        shadow-xl
                                    "
                                >

                                    <p
                                        className="
                                            text-slate-400
                                            mb-2
                                        "
                                    >
                                        Revenue
                                    </p>

                                    <h2
                                        className="
                                            text-4xl
                                            font-bold
                                            text-blue-400
                                        "
                                    >
                                        ₹
                                        {
                                            stats?.revenue || 0
                                        }
                                    </h2>

                                </div>

                            </div>

                            {/* Quick Actions */}

                            <div
                                className="
                                    mt-10
                                    bg-slate-900
                                    border
                                    border-slate-800
                                    rounded-3xl
                                    p-8
                                "
                            >

                                <h2
                                    className="
                                        text-3xl
                                        font-bold
                                        mb-6
                                    "
                                >
                                    Quick Overview
                                </h2>

                                <div
                                    className="
                                        grid
                                        md:grid-cols-3
                                        gap-6
                                    "
                                >

                                    <div
                                        className="
                                            bg-slate-800
                                            rounded-2xl
                                            p-6
                                        "
                                    >
                                        ✈ Flights are being managed
                                        from Admin Flights page.
                                    </div>

                                    <div
                                        className="
                                            bg-slate-800
                                            rounded-2xl
                                            p-6
                                        "
                                    >
                                        🎫 View all bookings from
                                        Admin Bookings page.
                                    </div>

                                    <div
                                        className="
                                            bg-slate-800
                                            rounded-2xl
                                            p-6
                                        "
                                    >
                                        💰 Revenue updates automatically
                                        from successful bookings.
                                    </div>

                                </div>

                            </div>

                        </>

                    )
                }

            </div>

        </div>

    );

};

export default AdminDashboard;