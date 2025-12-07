import dotenv from "dotenv"
import express from "express"
import askRoute from "./src/routes/ask.js"
import connectMongoDB from "./src/db/db.js";

dotenv.config();
const app = express();
app.use(express.json());



const PORT = process.env.PORT || 3000;

await connectMongoDB();
app.use('/api/ai', askRoute);
console.log("AI Router Ready");

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
