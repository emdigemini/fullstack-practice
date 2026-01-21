import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import ratelimiter from "./middleware/ratelimiter.js";

const app = express();
const PORT = process.env.PORT || 5005;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(ratelimiter);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// routes handler
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// connect DB and start server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log("Server started on PORT:", PORT));
  } catch (err) {
    console.warn("Server failed to start", err);
    process.exit(1);
  }
})();