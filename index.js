import express from "express"
import { connectDB } from "./db/connectDB.js";
import dotenev from "dotenv"
import authroute from "./routes/auth.route.js"

const app=express();
dotenev.config();
const PORT =process.env.PORT || 3000;
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use("/api/auth",authroute)

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});