import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        requried: true,
    },
    to: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {

        economy: {
            type: Number,
            required: true,
        },

        business: {
            type: Number,
            required: true,
        },

        firstClass: {
            type: Number,
            required: true,
        },

    },
    availableSeats: {
        type: Number,
        required: true,
    },
    classType: {
        type: String,
        enum: ["Economy", "Business", "First Class"],
        default: "Economy",
    },
    date: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Flight = mongoose.model("Flight", flightSchema);
export default Flight;