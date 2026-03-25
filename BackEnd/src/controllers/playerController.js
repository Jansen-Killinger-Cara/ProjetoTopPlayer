import * as playerModel from "../models/playerModel.js";

export async function listar(req, res) {
  const players = await playerModel.listarPlayers();
  res.json(players);
}

export async function buscarPorId(req, res) {
  const player = await playerModel.buscarPlayerPorId(req.params.id);
  if (!player) return res.status(404).json({ msg: "Player não encontrado" });
  res.json(player);
}

export async function criar(req, res) {
  const { nickname, plataforma } = req.body;
  if (!nickname) return res.status(400).json({ msg: "nickname é obrigatório" });

  const id = await playerModel.criarPlayer({ nickname, plataforma: plataforma || "OUTRO" });
  res.status(201).json({ msg: "Player criado", id });
}

export async function atualizar(req, res) {
  const { nickname, plataforma } = req.body;
  const afetadas = await playerModel.atualizarPlayer(req.params.id, { nickname, plataforma });
  if (!afetadas) return res.status(404).json({ msg: "Player não encontrado" });
  res.json({ msg: "Player atualizado" });
}

export async function remover(req, res) {
  const afetadas = await playerModel.deletarPlayer(req.params.id);
  if (!afetadas) return res.status(404).json({ msg: "Player não encontrado" });
  res.json({ msg: "Player removido" });
}