import express  from "express";
import { saveActivity,
        getActivityOne,
         getActivities,
         updateActivity,
         deleteActivity,
        checkActivities,
        sendNotification } from "../controller/activitiesController.js";

const router = express.Router();

router
.post("/", saveActivity)
.post("/sendNotification", sendNotification)
// .post("/",checkActivities)
.get("/", getActivities )
.get("/:_id", getActivityOne );

router
.put("/:id", updateActivity)
.delete("/:id", deleteActivity)


export default router;