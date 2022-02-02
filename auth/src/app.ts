import express from "express";
import { connect } from "mongoose";
require("express-async-errors");
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("/*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await connect("mongodb://auth-mongo-svc:27017");
  } catch (err) {
    console.log(err);
  }
};

app.listen(3000, () => {
  console.log("🚀 Server ready at http://localhost:3000 🚀");
});
