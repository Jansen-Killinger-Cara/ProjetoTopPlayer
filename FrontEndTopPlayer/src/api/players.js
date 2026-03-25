import { api } from "./api";

export async function listarPlayers() {
  const { data } = await api.get("/players");
  return data;
}

export async function criarPlayer(payload) {
  const { data } = await api.post("/players", payload);
  return data;
}

export async function atualizarPlayer(id, payload) {
  const { data } = await api.put(`/players/${id}`, payload);
  return data;
}

export async function deletarPlayer(id) {
  const { data } = await api.delete(`/players/${id}`);
  return data;
}