// import mongoose from "mongoose";

// const registerSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
//   fullName: { type: String },
//   college: { type: String },
//   category: { type: String, enum: ["student", "faculty", "industry"], default: "student" },
//   affiliation: String,
//   phone: String,
//   abstractTitle: String,
//   abstractContent: { type: String },
//   paperUrl: String,
// }, { timestamps: true });

// export default mongoose.model("Registration", registerSchema);

import mongoose from "mongoose";

// This schema defines an individual participant. It's a sub-document.
const participantSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Participant name is required."] 
  },
  designation: { 
    type: String, 
    required: [true, "Participant designation is required."] 
  },
  organisation: { 
    type: String, 
    required: [true, "Participant organisation is required."] 
  },
  email: { 
    type: String, 
    required: [true, "Participant email is required."] 
  },
  phone: { 
    type: String, 
    required: [true, "Participant phone number is required."] 
  },
}, { _id: false }); // Prevents Mongoose from creating a separate _id for each participant.

// This is the main registration schema that matches your React form.
const registerSchema = new mongoose.Schema({
  // It's good practice to link the entire registration to a single user account.
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true // Ensures one registration per user account.
  },
   uniqueId: {
    type: String, // just a string, not ObjectId
    required: true,
    unique: true,
  },
  // This defines the array of participants using the schema above.
  participants: {
    type: [participantSchema],
    validate: {
      validator: (arr) => arr.length >= 1 && arr.length <= 4,
      message: "You must provide between 1 and 4 participants."
    },
    required: true
  },

  // Contact Information fields from the form.
  address: { 
    type: String, 
    required: [true, "Mailing address is required."] 
  },
  country: { 
    type: String, 
    required: [true, "Country is required."] 
  },
  pincode: { 
    type: String, 
    required: [true, "Pincode is required."] 
  },

  // Abstract Submission fields from the form.
  track: { 
    type: String, 
    required: [true, "Conference track selection is required."] 
  },
  abstractTitle: { 
    type: String, 
    required: [true, "Abstract title is required."] 
  },
  abstractContent: { 
    type: String, 
    required: [true, "Abstract content is required."] 
  },
  abstractExpression: { 
    type: String, 
    required: [true, "Keywords are required."] 
  },
  
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields.

export default mongoose.model("Registration", registerSchema);