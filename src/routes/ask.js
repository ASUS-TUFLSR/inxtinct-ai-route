import express from 'express';
import { getRouting } from "../services/llm.js"
import { route } from "../services/router.js"

const router = express.Router();

router.post("/", async (req, res) => {
  const query = req.body.query;

  if (!query) {
    return res.status(400).json({ error: "query is required" });
  }

  try {
    const routingJson = await getRouting(query);
    const english = await route(routingJson, query);

    return res.json({ response: english });
  } catch (err) {
    console.error("Error in /ask:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;