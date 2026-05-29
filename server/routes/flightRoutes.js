import express from "express";
import { createFlight, deleteFlight, getFlightById, getFlights, searchFlights, updateFlight } from "../controllers/flightController.js";

const router=express.Router();

router.post("/create",createFlight);
router.get("/search",searchFlights);
router.get("/",getFlights);
router.get("/:id",getFlightById);
router.put("/:id",updateFlight);
router.delete("/:id",deleteFlight);


export default router;