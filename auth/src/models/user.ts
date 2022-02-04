import mongoose from "mongoose";
import { Password } from "../services/password";

interface IUser {
  email: string;
  password: string;
}

interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
}

interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attrs: IUser): IUserDoc;
}

const userSchema = new mongoose.Schema<IUserDoc>({
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hashedPassword = await Password.toHash(this.password);
  this.password = hashedPassword;
  return next();
});

userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

export const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);
