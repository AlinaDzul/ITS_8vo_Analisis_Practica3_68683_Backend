import express from "express";
import { AuthServiceImpl } from "./infrastructure/services/AuthServiceImpl";
import { LoginUseCase } from "./core/useCases/LoginUseCase";

const app = express();
const authService = new AuthServiceImpl();
const loginUseCase = new LoginUseCase(authService);

app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUseCase.execute(email, password);
  if (user) res.json(user);
  else res.status(401).json({ error: "Invalid credentials" });
});

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  const user = await authService.register(email, password, name);
  if (user) res.json(user);
  else res.status(400).json({ error: "User already exists" });
});

app.listen(3000, () => console.log("Backend running on port 3000"));