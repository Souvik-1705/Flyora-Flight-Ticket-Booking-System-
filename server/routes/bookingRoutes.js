import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { cancelBooking, createBooking, deleteBooking, getAllBookings, getBookings } from '../controllers/bookingController.js';

const router=express.Router();

router.post("/create-booking",protect,createBooking);
router.get("/my",protect,getBookings);
router.put("/cancel/:id",protect,cancelBooking);
router.delete("/:id",protect,deleteBooking);
router.get("/admin/all",getAllBookings);

export default router;