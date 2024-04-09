import { Router } from "express";
import { Entry } from "../../Database/db.js";
import { z } from "zod";
import authmiddleware from "../../middleware/middleware.js";

export const entry_router = Router();

const JournalEntry = z.object({
    date: z.string().datetime(),
    text: z.string(),
  });
  
  entry_router.post('/addentry', authmiddleware, async (req, res) => {
    console.log(req.body)
    const result = JournalEntry.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ message: 'Error in request format' });
    }
    console.log(result.data.date)
    try {
      await Entry.create({
        person_id: req.userId, // Assuming this is set by your authmiddleware
        date: result.data.date,
        text: result.data.text,
      });
      res.json({ message: 'Entry added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error while saving the entry' });
    }
  });
  
  
  // all entries
  entry_router.get("/allentry", authmiddleware, async (req, res) => {
    try {
      // Assuming req.userId is set by the authmiddleware after token verification
      const userId = req.userId;
  
      // Fetch all entries from the database where the person_id matches the userId
      const entries = await Entry.find({ person_id: userId }).sort({ date: -1 }); // Sorting by date descending
  
      // Send the fetched entries back to the client
      res.json({ entries });
    } catch (error) {
      console.error("Failed to fetch entries:", error);
      res.status(500).json({ message: "Failed to fetch entries" });
    }
  });
  
  // all entries with date
  entry_router.get("/allentry",authmiddleware,async(req,res)=>{
    
  });
  
  