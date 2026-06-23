import express from "express";
import { askFoodAI }
from "../controllers/aiController.js";

const aiRouter =
express.Router();

aiRouter.post(
"/chat",
askFoodAI
);

export default aiRouter;