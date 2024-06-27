import express  from "express";
import { saveActivity,
         getActivities,
         updateActivity,
         deleteActivity,
        checkActivities } from "../controller/activitiesController.js";

const router = express.Router();

router
.post("/", saveActivity)
// .post("/",checkActivities)
.get("/", getActivities );

router
.put("/:id", updateActivity)
.delete("/:id", deleteActivity)


export default router;