import { Router } from "express";
import jwt from "jsonwebtoken";
import { User} from "../../Database/db.js";
import { z } from "zod";
import JWT_TOKEN from "../../config.js";

export const signin_router = Router();

const signinBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  
  signin_router.post("/signin", async (req, res) => {
    console.log(req.body);
    const result = signinBody.safeParse(req.body);
    console.log(result);
    if (!result.success) {
      return res.status(404).json({ message: "Check your Email" });
    }
  
    try {
      const userFind = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });
  
      if (userFind) {
        const token = jwt.sign({ UserId: userFind._id, username: userFind.username }, JWT_TOKEN);
        return res.json({ token: token });
      }
  
      res.status(411).json({ message: "Failed to sign in. Please check your email and password." });
    } catch (error) {
      // Log the error to the console for debugging
      console.error("Error accessing the database: ", error);
  
      // Respond to the client with a generic error message
      // It's usually a good idea to not expose internal details like database errors directly to the client
      res.status(503).json({ message: "Service unavailable. Please try again later." });
    }
  });
  
  