import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server on ${PORT}`));


app.get("/", function (req, res) {
  res.json({ message: "Welcome to guest book" });
});


app.get("/api/messages", async (req, res) => {
  const result = await db.query(
    "SELECT id, name, message FROM guestbook ORDER BY id DESC"
  );
  res.json(result.rows);
});

app.post("/api/messages", async (req, res) => {
  const {name, message } = req.body;
  const result = await db.query(
    "INSERT INTO guestbook (name, message) VALUES ($1, $2) RETURNING id, name, message",
    [name, message]
  );
  res.json(result.rows[0]);
});
