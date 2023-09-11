import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }
  });
  
  const Person = mongoose.model("Person", PersonSchema);
  
export default  Person;