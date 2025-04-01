import { User } from "../../core/domain/User";
import { AuthService } from "../../core/ports/AuthService";

export class AuthServiceImpl implements AuthService {
  private users: { email: string; password: string; name: string; id: string }[] = [];

  async login(email: string, password: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) return { id: user.id, email: user.email, name: user.name, token: "fake-jwt-token" };
    return null;
  }

  async register(email: string, password: string, name: string): Promise<User | null> {
    if (this.users.find(u => u.email === email)) return null;
    const newUser = { id: Date.now().toString(), email, password, name };
    this.users.push(newUser);
    return { id: newUser.id, email, name, token: "fake-jwt-token" };
  }

  async logout(): Promise<void> {
    // No implementado
  }
}