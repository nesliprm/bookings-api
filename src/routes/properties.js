import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import getPropertyByLocation from "../services/properties/getPropertyByLocation.js";
import getPropertyByPrice from "../services/properties/getPropertyByPrice.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const { location, pricePerNight } = req.query;

  try {
    if (location) {
      const properties = await getPropertyByLocation(location);

      if (!properties.length) {
        return res
          .status(404)
          .json({ message: `No property found in ${location}` });
      }

      return res.status(200).json(properties);
    }

    if (pricePerNight) {
      const properties = await getPropertyByPrice(pricePerNight);

      if (!properties.length) {
        return res.status(404).json({
          message: `No property found with price ${pricePerNight} per night`,
        });
      }

      return res.status(200).json(properties);
    }

    const properties = await getProperties();
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const property = await getPropertyById(id);

    if (!property) {
      res.status(404).json({ message: `Property with id ${id} not found` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  const {
    hostId,
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
  } = req.body;

  try {
    const property = await updatePropertyById(id, {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
    });

    if (property) {
      res.status(200).send({
        message: `Property with id ${id} successfully updated`,
        property,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res) => {
  const {
    hostId,
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
  } = req.body;
  const newProperty = await createProperty(
    hostId,
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount
  );
  res.status(201).json(newProperty);
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const property = await deletePropertyById(id);

    if (property) {
      res.status(200).send({
        message: `Property with id ${id} successfully deleted`,
        property,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
