import express from  'express';
import { saveUser,
         getCostumers,
         updateUser,
         deleteUser } from '../controller/userController.js';

const router = express.Router();

router
.post("/", saveUser )
.get("/", getCostumers);

router
.put("/:id", updateUser)
.delete("/:id", deleteUser)



export default router;