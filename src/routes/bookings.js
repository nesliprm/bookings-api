import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import getBookingByUserId from "../services/bookings/getBookingByUserId.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const { userId } = req.query;

  try {
    if (userId) {
      const bookings = await getBookingByUserId(userId);

      if (!bookings.length) {
        return res.status(404).json({
          message: `No bookings found for user with ID ${userId}`,
        });
      }

      return res.status(200).json(bookings);
    }

    const bookings = await getBookings();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const booking = await getBookingById(id);

    if (!booking) {
      res.status(404).json({ message: `Booking with id ${id} not found` });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  const {
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
  } = req.body;

  try {
    const booking = await updateBookingById(id, {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    if (booking) {
      res.status(200).send({
        message: `Booking with id ${id} successfully updated`,
        booking,
      });
    } else {
      res.status(404).json({
        message: `Booking with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests } =
    req.body;

  try {
    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests
    );
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const booking = await deleteBookingById(id);

    if (booking) {
      res.status(200).send({
        message: `Booking with id ${id} successfully deleted`,
        booking,
      });
    } else {
      res.status(404).json({
        message: `Booking with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
