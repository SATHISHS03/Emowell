import mongoose from "mongoose";

// Corrected the import and usage of mongoose
const { Schema } = mongoose;

// Connect to MongoDB
// check with connection string
mongoose.connect('mongodb+srv://sathishselvag03:oovfNIBNjpRZF2n3@sathishdb.dcnsrjv.mongodb.net/emowell?authSource=admin&replicaSet=atlas-dpp3ub-shard-0&readPreference=primary&ssl=true')

// Define the User schema
const UserSchema = new Schema({
    username: String,
    password: String,
    email:String
        
});
const EntrySchema = new Schema({
    person_id: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now }, // Use Mongoose's Date type and default to the current date/time
    text: String,
});

const taskSchema = new mongoose.Schema({
    id: { type: String, required: true },
    content: { type: String, required: true }
  }, { _id: false }); // _id is set to false to prevent Mongoose from creating an _id for subdocuments

  const todoSchema = new mongoose.Schema({
    person_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      unique: true // Ensures one todo document per user
    },
    columns: {
      todo: [taskSchema], // Array of tasks in the "todo" column
      inProgress: [taskSchema], // Array of tasks in the "inProgress" column
      completed: [taskSchema] // Array of tasks in the "completed" column
    }
  });

  const SleeptimeSchema = new mongoose.Schema({
    person_id: { type: Schema.Types.ObjectId, ref: 'User' },
    Date: { type: Date, default: Date.now }, 
    sleepTime: String 
  });

  const MoodtrackerSchema = new mongoose.Schema({
    person_id: { type: Schema.Types.ObjectId, ref: 'User' },
    Date: { type: Date, default: Date.now},
    Moodname : String,
    Moodemoji : String

  });
  


export const User = mongoose.model('User', UserSchema);
export const Entry = mongoose.model('Entry', EntrySchema);
export const Todo = mongoose.model('Todo', todoSchema);
export const Sleeptime = mongoose.model('Sleeptime', SleeptimeSchema);
export const Moodtracker = mongoose.model('Moodtracker', MoodtrackerSchema);







