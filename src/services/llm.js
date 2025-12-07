import dotenv from "dotenv";
import Groq from "groq-sdk";


dotenv.config();


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getRouting(userQuery) {
  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `
You are an AI router. Interpret the user query and output ONLY valid JSON with this exact schema:
{
  "tool": "weather" | "database" | "none",
  "params": {}  // Tool-specific params here
}
No explanation, no extra text.

- For weather queries (e.g., "weather in [place]"): Set "tool": "weather", "params": {"location": "extracted city or place name as string"}.
- For database queries about employees (e.g., count employees, list by salary/department/join date/name/city): Set "tool": "database", "params": {
    "collection": "employees",  // Always use this
    "operation": "count" | "list" | "find",  // count for totals, list/find for listing names
    "filter": {  // Optional object with these keys only
      "department": string,  // e.g., "Engineering"
      "minSalary": number,  // For salary >= this value
      "joinedLastMonth": boolean,  // true to filter last month joins
      "name": string  // Exact name match
      "city": string
    }
  }.
- For anything else: Set "tool": "none", "params": {"message": "brief English fallback message"}.
Extract and map the query precisely to these fields. If the query doesn't fit, use "none".
`
        },
        {
          role: "user",
          content: userQuery
        }
      ],
      temperature: 0.2,
    });

    const content = response.choices[0].message.content;

    return JSON.parse(content);
  } catch (error) {
    console.error("LLM Routing Error:", error);
    throw new Error("Failed to generate routing instructions.");
  }
}