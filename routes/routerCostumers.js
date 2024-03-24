import express  from "express";
import { saveCostumer,
         getCostumers,
         updateCostumer,
         deleteCostumer
       } from "../controller/costumerController.js";
const router = express.Router();

router
 .post("/", saveCostumer)
 .get("/", getCostumers);

router
 .put("/:id", updateCostumer)
 .delete("/:id", deleteCostumer);

export default router