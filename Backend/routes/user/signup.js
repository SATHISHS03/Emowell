import { Router } from "express";
import { User} from "../../Database/db.js";
import { z } from "zod";
export const signup_router = Router();

const signupBody = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

signup_router.post('/signup', async (req, res) => {
  const result = signupBody.safeParse(req.body);
  if (!result.success) {
    return res.status(411).json({ message: "Incorrect Inputs" });
  }

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(411).json({ message: "Email already taken/Incorrect inputs" });
  }

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });


  // const token = jwt.sign({ userId: user._id }, JWT_TOKEN);
  res.json({ message: "User created successfully" });
});
