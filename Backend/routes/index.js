import { Router } from "express";
import { signin_router } from "./user/signin.js";
import { signup_router } from "./user/signup.js";
import { entry_router } from "./user/entry.js";
import { todo_router } from "./todo/todo.js";
import { Sleeptime_router } from "./sleeptimer/sleeptimer.js";
import { Moodtracker_router } from "./moodtracker/moodtracker.js";

export const rootrouter = Router();
 
rootrouter.use("/user",  signin_router)
rootrouter.use("/user", signup_router)
rootrouter.use("/user", entry_router)
rootrouter.use("/todo", todo_router)
rootrouter.use("/sleeptimer", Sleeptime_router)
rootrouter.use("/moodtracker",  Moodtracker_router)


