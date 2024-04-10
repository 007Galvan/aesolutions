import express  from "express";
import { saveActivity,
         getActivities,
         updateActivity,
         deleteActivity } from "../controller/activitiesController.js";

const router = express.Router();

router
.post("/", saveActivity)
.get("/", getActivities );

router
.put("/:id", updateActivity)
.delete("/:id", deleteActivity)


export default router;