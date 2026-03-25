
import * as rankingModel from "../models/rankingModel.js";

export async function porJogo(req, res) {
  const { jogoId } = req.params;
  const { limite } = req.query;

  const ranking = await rankingModel.rankingPorJogo(Number(jogoId), limite || 10);
  res.json(ranking);
}

export async function geral(req, res) {
  const { limite } = req.query;
  const ranking = await rankingModel.rankingGeral(limite || 10);
  res.json(ranking);
}