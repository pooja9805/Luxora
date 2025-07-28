import express from 'express';
import { changeBookingStatus, checkCarAvailability, createBooking, getOwnerBookings, getUserBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';
const bookingRouter = express.Router();

// Allow both GET and POST for availability check
bookingRouter.route('/check-availability')
  .get(checkCarAvailability)
  .post(checkCarAvailability);
bookingRouter.post('/create', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, changeBookingStatus);

export default bookingRouter;