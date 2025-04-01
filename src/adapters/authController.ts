import { Request, Response } from "express";
import { LoginUseCase } from "../core/useCases/LoginUseCase";
import { RegisterUseCase } from "../core/useCases/RegisterUseCase";
import { AuthServiceImpl } from "../infrastructure/services/AuthServiceImpl";

const authService = new AuthServiceImpl();
const loginUseCase = new LoginUseCase(authService);
const registerUseCase = new RegisterUseCase(authService);

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUseCase.execute(email, password);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = await registerUseCase.execute(email, password, name);
  if (user) {
    res.json(user);
  } else {
    res.status(400).json({ error: "User already exists" });
  }
};