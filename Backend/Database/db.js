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
  date: { type: Date, default: Date.now },
  text: { type: String, required: true },
  sentiment: String
});

const TaskSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  content: String
});

const TodoSchema = new mongoose.Schema({
  person_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  columns: {
    todo: [TaskSchema],
    inProgress: [TaskSchema],
    completed: [TaskSchema]
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
EntrySchema.index({ person_id: 1, date: 1 }, { unique: true });


export const User = mongoose.model('User', UserSchema);
export const Entry = mongoose.model('Entry', EntrySchema);
export const Todo = mongoose.model('Todo', TodoSchema);
export const Sleeptime = mongoose.model('Sleeptime', SleeptimeSchema);
export const Moodtracker = mongoose.model('Moodtracker', MoodtrackerSchema);







