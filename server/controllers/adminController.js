import Flight from "../models/Flight.js";
import Booking from "../models/Booking.js";

export const getDashboardStats =
async (req,res)=>{

    try {

        const totalFlights =
        await Flight.countDocuments();

        const totalBookings =
        await Booking.countDocuments();

        const activeBookings =
        await Booking.countDocuments({
            bookingStatus:"Booked"
        });

        const revenueData =
        await Booking.find({
            bookingStatus:"Booked"
        });

        const revenue =
        revenueData.reduce(
            (acc,item)=>
            acc + item.totalPrice,
            0
        );

        res.status(200).json({

            totalFlights,
            totalBookings,
            activeBookings,
            revenue,

        });

    } catch (error) {

        res.status(500).json({
            message:"Server Error"
        });

    }

};