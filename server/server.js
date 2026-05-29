import "./config/env.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

connectDB();

const app=express();

app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/flights",flightRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/admin",adminRoutes);

const port = process.env.PORT;
app.get("/",(req,res)=>{
    res.send("API is running");
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})