import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return v.endsWith("@vitapstudent.ac.in");
      },
      message: "Email must end with @vitapstudent.ac.in"
    }
  }
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamLeader: memberSchema,
  members: {
    type: [memberSchema],
    validate: {
      validator: function(v) {
        return v.length >= 1 && v.length <= 2; // + leader = 2-3 total
      },
      message: "Team must have minimum 2 and maximum 3 members"
    }
  },
  college: { type: String, required: true },
  teamNumber: { type: String, unique: true },
  isVerified: { type: Boolean, default: false },
  qualified: { type: Boolean, default: false }
});

export default mongoose.model("Team", teamSchema);
