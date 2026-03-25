import { api } from "./api";

export async function rankingGeral(limite = 10) {
  const { data } = await api.get(`/rankings/geral?limite=${limite}`);
  return data;
}

export async function rankingPorJogo(jogoId, limite = 10) {
  const { data } = await api.get(`/rankings/jogo/${jogoId}?limite=${limite}`);
  return data;
}