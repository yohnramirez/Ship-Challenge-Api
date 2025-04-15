import express from "express";
import cors from "cors"
import shipRoutes from "./routes/shipRoutes"

const app = express();

app.use(cors())
app.use(express.json())
app.use("/", shipRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
