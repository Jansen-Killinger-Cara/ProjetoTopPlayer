import * as jogoModel from "../models/jogoModel.js";

export async function listar(req, res) {
  const jogos = await jogoModel.listarJogos();
  res.json(jogos);
}

export async function buscarPorId(req, res) {
  const jogo = await jogoModel.buscarJogoPorId(req.params.id);
  if (!jogo) return res.status(404).json({ msg: "Jogo não encontrado" });
  res.json(jogo);
}

export async function criar(req, res) {
  const { nome, genero } = req.body;
  if (!nome || !genero) return res.status(400).json({ msg: "nome e genero são obrigatórios" });

  const id = await jogoModel.criarJogo({ nome, genero });
  res.status(201).json({ msg: "Jogo criado", id });
}

export async function atualizar(req, res) {
  const { nome, genero } = req.body;
  const afetadas = await jogoModel.atualizarJogo(req.params.id, { nome, genero });
  if (!afetadas) return res.status(404).json({ msg: "Jogo não encontrado" });
  res.json({ msg: "Jogo atualizado" });
}

export async function remover(req, res) {
  const afetadas = await jogoModel.deletarJogo(req.params.id);
  if (!afetadas) return res.status(404).json({ msg: "Jogo não encontrado" });
  res.json({ msg: "Jogo removido" });
}