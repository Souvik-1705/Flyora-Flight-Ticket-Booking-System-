import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
        required: true,
    },
    passengers: [
        {
            fullName: {
                type: String,
                required: true,
            },
            age: {
                type: String,
                required: true,
            },
            nationality: {
                type: String,
                required: true,
            }
        }
    ],
    bookingStatus: {
        type: String,
        enum: ["Booked", "Cancelled"],
        default: "Booked",
    },
    classType: {
        type: String,
        enum: [
            "Economy",
            "Business",
            "First Class"
        ],
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
