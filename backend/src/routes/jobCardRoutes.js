import express from "express"
const router = express.Router();
import {jobCardController} from "../controllers/jobCardController.js"

// GET all job cards
router.get('/jobCards', jobCardController.getAllJobCards);

// GET a single job card by ID
router.get('/jobCard/:id', jobCardController.getJobCardById);

// POST create a new job card
router.post('/jobCard', jobCardController.createJobCard);

// PUT update an existing job card
router.put('/jobCard/:id', jobCardController.updateJobCard);

// DELETE a job card
router.delete('/jobCard/:id', jobCardController.deleteJobCard);

export default router;