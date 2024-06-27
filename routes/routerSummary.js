import express from 'express';
import { getSummary } from '../controller/summaryController.js';

const router = express.Router();

router
.get("/", getSummary)

export default router;