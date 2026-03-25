import { api } from "./api";

export async function loginRequest(email, senha) {
  const { data } = await api.post("/usuarios/login", { email, senha });
  return data;
}