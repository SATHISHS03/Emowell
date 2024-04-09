import { Router } from "express";
import authMiddleware from "../../middleware/middleware.js"; // ensure this path is correct
import { Moodtracker } from "../../Database/db.js"; // ensure this path is correct

export const Moodtracker_router = Router();


Moodtracker_router.post('/addmoodtracker', authMiddleware, async (req, res) => {
  try {
    
    const moodtracker = new Moodtracker({
      person_id: req.userId, 
      Date: req.body.date,
      Moodname: req.body.Moodname,
      Moodemoji:req.body.Moodemoji
    });

    
    await moodtracker.save();

    res.status(201).json({
      message: 'Mood tracker entry created successfully',
      moodtracker: moodtracker
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create mood tracker entry',
      error: error.message
    });
  }
});
