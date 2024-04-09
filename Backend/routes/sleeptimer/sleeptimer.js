import { Router } from "express";
import authmiddleware from "../../middleware/middleware.js";
import { Sleeptime } from "../../Database/db.js";

export const Sleeptime_router = Router();
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

