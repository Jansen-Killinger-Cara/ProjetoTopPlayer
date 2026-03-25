import * as partidaModel from "../models/partidaModel.js";

export async function listar(req, res) {
  const partidas = await partidaModel.listarPartidas();
  res.json(partidas);
}

export async function criar(req, res) {
  const { jogo_id, player_id, pontos, data_partida } = req.body;

  if (!jogo_id || !player_id || pontos === undefined)
    return res.status(400).json({ msg: "jogo_id, player_id e pontos são obrigatórios" });

  const id = await partidaModel.criarPartida({
    jogo_id: Number(jogo_id),
    player_id: Number(player_id),
    pontos: Number(pontos),
    data_partida: data_partida || null
  });

  res.status(201).json({ msg: "Partida registrada", id });
}

export async function remover(req, res) {
  const afetadas = await partidaModel.deletarPartida(req.params.id);
  if (!afetadas) return res.status(404).json({ msg: "Partida não encontrada" });
  res.json({ msg: "Partida removida" });
}