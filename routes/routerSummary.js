import express from 'express';
import { getSummary, updateSummary, generatePDF, retrievePDF, viewPDF, getSummaryOne} from '../controller/summaryController.js';

const router = express.Router();

router
.get("/", getSummary)
.get("/:_id", getSummaryOne)
.get("/viewpdf", viewPDF)
.get("/pdf/:id", retrievePDF )

router
 .put("/:id/generatePDF",generatePDF)
 .put("/:id", updateSummary)
 

export default router;