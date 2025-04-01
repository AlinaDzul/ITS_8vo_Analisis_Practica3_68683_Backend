import express from "express";
import { login, register } from "./adapters/authController";

const app = express();
app.use(express.json());

app.post("/login", login);
app.post("/register", register);

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));