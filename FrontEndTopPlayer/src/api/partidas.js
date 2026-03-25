import { api } from "./api";

export async function listarPartidas() {
  const { data } = await api.get("/partidas");
  return data;
}

export async function criarPartida(payload) {
  const { data } = await api.post("/partidas", payload);
  return data;
}

export async function deletarPartida(id) {
  const { data } = await api.delete(`/partidas/${id}`);
  return data;
}