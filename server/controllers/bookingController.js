import Flight from "../models/Flight.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
    try {
        const { flightId, passengers, classType, totalPrice } = req.body;
        const flightExists = await Flight.findById(flightId);

        if (!flightExists) {
            return res.status(404).json({ message: "Flight not found" });
        }
        if (flightExists.availableSeats < passengers.length) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        const booking = await Booking.create({
            user: req.user._id,
            flight: flightId,
            passengers,
            classType,
            totalPrice,
        });
        flightExists.availableSeats = flightExists.availableSeats - passengers.length;
        await flightExists.save();
        res.status(201).json({ message: "Booked successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.user._id
        })
            .populate("flight")
            .sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" })
        }
        const flight = await Flight.findById(booking.flight);

        flight.availableSeats = flight.availableSeats + booking.passengers.length;

        await flight.save();

        booking.bookingStatus = "Cancelled";

        await booking.save();

        res.status(200).json({ message: "Booking Cancelled" });
    } catch (error) {
        res.status(500).json({ messagea: "Server Error" });
    }
}

export const deleteBooking=async(req,res)=>{
    try {
        const booking=await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({message:"Booking not found"});
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Booking deleted successfully"});

    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

export const getAllBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({})

        .populate(
          "user",
          "name email"
        )

        .populate(
          "flight"
        )

        .sort({
          createdAt: -1,
        });

      res.status(200).json(
        bookings
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

  };