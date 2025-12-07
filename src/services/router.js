import { getWeather } from "./tools/weatherTool.js"
import { handle } from "./tools/dbTool.js"


export const route = async (routingJson, originalQuery) => {
  if (!routingJson || !routingJson.tool) {
    throw new Error("Invalid routing JSON");
  }

  const tool = routingJson.tool;

  if (tool === "weather") {
    const location =
      routingJson.params?.location || routingJson.location || originalQuery;

    return await getWeather(location);
  }

  if (tool === "database") {
  const params = routingJson.params || {};
  const collection = params.collection;
  const operation = params.operation;
  const filter = params.filter || {};

  if (!collection || !operation) {
    return "Invalid database parameters provided.";
  }

  return await handle(collection, operation, filter);
}

  if (tool === "none") {
    return routingJson.message || "I can help but I need more details.";
  }

  throw new Error("Unknown tool: " + tool);
};
