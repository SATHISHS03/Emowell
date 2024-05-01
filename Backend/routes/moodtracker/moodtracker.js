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
// Express route in your mood tracker backend
Moodtracker_router.get('/getmoodsfordate', authMiddleware, async (req, res) => {
  const { date } = req.query; // Use query parameters instead of body
  const userId = req.userId;
  console.log(date);

  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  try {
    const moodEntries = await Moodtracker.find({
      person_id: userId,
      Date: { $gte: startDate, $lte: endDate }
    }).sort({ Date: -1 });
    console.log(moodEntries);

    if (moodEntries.length > 0) {
      const responseData = moodEntries.map(entry => ({
        mood: entry.Moodemoji,
        date: entry.Date
      }));
      console.log("Mood entries fetched for date:", date, responseData);
      res.json(responseData);
    } else {
      res.status(404).json({ message: 'No mood entries found for this date' });
    }
  } catch (error) {
    console.error('Error retrieving the mood entries:', error);
    res.status(500).json({ message: 'Failed to retrieve the mood entries', error: error.message });
  }
});





