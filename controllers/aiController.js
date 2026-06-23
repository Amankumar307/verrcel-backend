import { GoogleGenerativeAI } from "@google/generative-ai";
import foodModel from "../models/foodModel.js";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const askFoodAI = async (req, res) => {
  try {

    const { message } = req.body;

    const foods = await foodModel.find({});

    const menu = foods
      .map(
        (item) =>
`${item.name} - ₹${item.price}
Category: ${item.category}`
      )
      .join("\n");

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

    const prompt = `
You are food recommendation assistant.

Available foods:
${menu}

Rules:
Recommend only available food.
Respect user budget.

User:
${message}
`;

    const result =
      await model.generateContent(prompt);

    res.json({
      success: true,
      reply:
        result.response.text(),
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message,
    });

  }
};