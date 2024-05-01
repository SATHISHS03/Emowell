import { Router } from "express";
import { Entry } from "../../Database/db.js";
import { z } from "zod";
import authmiddleware from "../../middleware/middleware.js";

export const entry_router = Router();

const JournalEntry = z.object({
  date: z.string(), // Validates that the date is a Date object.
  text: z.string(), // Validates that text is a string.
  sentiment: z.string().optional() // Optional detailed sentiment scores object.
});

  
  entry_router.post('/addentry', authmiddleware, async (req, res) => {
    console.log("Received entry data:", req.body);
    
    const result = JournalEntry.safeParse(req.body);
    if (!result.success) {
      console.error("Validation failed", result.error);
      return res.status(400).json({ message: 'Error in request format', errors: result.error.formErrors });
    }
  
    const { date, text, sentiment } = result.data;
    
    try {
      const newEntry = await Entry.create({
        person_id: req.userId, // The user ID should be set by the auth middleware.
        date: date,
        text: text,
        sentiment: sentiment
      });
  
      console.log("Entry added successfully:", newEntry);
      res.json({ message: 'Entry added successfully', entry: newEntry });
    } catch (error) {
      console.error("Failed to save the entry:", error);
      res.status(500).json({ message: 'Error while saving the entry', details: error.message });
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
  entry_router.delete("/dentry/:entryId", authmiddleware, async (req, res) => {
    console.log("reached")
    const { entryId } = req.params;
    console.log(req.userId);
    console.log(req.params.entryId);
  
    if (!entryId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid entry ID format" });
    }
  
    try {
      const userId = req.userId;
      console.log(req.userId);
      const entry = await Entry.findOne({ _id: entryId, person_id: userId });
      if (!entry) {
        return res.status(404).json({ message: "Entry not found or does not belong to the user" });
      }
      await Entry.deleteOne({ _id: entryId });
      res.json({ message: "Entry deleted successfully" });
    } catch (error) {
      console.error("Failed to delete entry:", error);
      res.status(500).json({ message: "Failed to delete entry" });
    }
  });
  
  