import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import createReview from "../services/reviews/createReview.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const reviews = await getReviews();
  res.status(200).json(reviews);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await getReviewById(id);

    if (!review) {
      res.status(404).json({ message: `Review with id ${id} not found` });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  const { userId, propertyId, rating, comment } = req.body;

  try {
    const review = await updateReviewById(id, {
      userId,
      propertyId,
      rating,
      comment,
    });

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully updated`,
        review,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res) => {
  const { userId, propertyId, rating, comment } = req.body;
  const newReview = await createReview(userId, propertyId, rating, comment);
  res.status(201).json(newReview);
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await deleteReviewById(id);

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully deleted`,
        review,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
