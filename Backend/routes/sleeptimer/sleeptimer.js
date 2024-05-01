import { Router } from "express";
import authmiddleware from "../../middleware/middleware.js";
import { Sleeptime } from "../../Database/db.js";

export const Sleeptime_router = Router();
// Assuming `Sleeptime` is your model and it's imported correctly
Sleeptime_router.get('/getLatestSleepTime', authmiddleware,async (req, res) => {
  const userId = req.userId; // Ensure this is correctly set by your middleware
  try {
    // Fetch all sleep time entries for the user, sorted by date in descending order
    const sleepTimes = await Sleeptime.find({ person_id: userId }).sort({ Date: -1 });
    console.log(userId,"userId")

    // Check if any documents were found
    if (sleepTimes && sleepTimes.length > 0) {
      // Transform the data to include only necessary fields if needed
      const responseData = sleepTimes.map(entry => ({
        date: entry.Date,
        sleepTime: entry.sleepTime
      }));
      console.log(responseData);
      res.json(responseData);
    } else {
      res.status(404).send('No sleep time records found');
    }
  } catch (error) {
    console.error('Error retrieving the sleep times:', error);
    res.status(500).send('Failed to retrieve the sleep times');
  }
});




Sleeptime_router.post('/sleeptimer', authmiddleware, async (req, res) => {
  try {
    const dateOnly = new Date(req.body.Date);
    dateOnly.setUTCHours(0, 0, 0, 0); 
    const existingSleepTime = await Sleeptime.findOne({
      person_id: req.userId,
      Date: dateOnly
    });
    console.log(req.userId, dateOnly);
    console.log(existingSleepTime);

    if (existingSleepTime) {
      
      existingSleepTime.sleepTime = req.body.sleepTime;
      await existingSleepTime.save();
      res.status(200).send(existingSleepTime);
    } else {
      const sleepTime = new Sleeptime({
        person_id: req.userId,
        Date: dateOnly,
        sleepTime: req.body.sleepTime
      });
      await sleepTime.save();
      res.status(201).send(sleepTime);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

