import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import UserRoutes from './routes/userRoutes.js';
import RegisterRoutes from './routes/registerRoutes.js'

const app = express();
const port = process.env.PORT || 4000;

connectDB();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("API Working");
});

app.use("/api/user", UserRoutes);
app.use("/api/abstractsubmition",RegisterRoutes)

app.listen(port, () => console.log("Server started on PORT:" + port));
