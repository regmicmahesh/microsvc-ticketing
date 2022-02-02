import express from 'express';

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.send("signout user route");
});

export { router as signoutRouter };

