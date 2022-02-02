import mongoose from "mongoose";

interface User{
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

export const User = mongoose.model("User", userSchema);

new User({email: "", password: 12})

