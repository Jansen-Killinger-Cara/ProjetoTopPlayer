import { pool } from "../config/db.js";

export async function listarPlayers() {
  const [rows] = await pool.query(
    "SELECT id, nickname, plataforma, criado_em FROM players ORDER BY id DESC"
  );
  return rows;
}

export async function buscarPlayerPorId(id) {
  const [rows] = await pool.query(
    "SELECT id, nickname, plataforma, criado_em FROM players WHERE id = ?",
    [id]
  );
  return rows[0];
}

export async function criarPlayer({ nickname, plataforma }) {
  const [result] = await pool.query(
    "INSERT INTO players (nickname, plataforma) VALUES (?, ?)",
    [nickname, plataforma]
  );
  return result.insertId;
}

export async function atualizarPlayer(id, { nickname, plataforma }) {
  const [result] = await pool.query(
    "UPDATE players SET nickname = ?, plataforma = ? WHERE id = ?",
    [nickname, plataforma, id]
  );
  return result.affectedRows;
}

export async function deletarPlayer(id) {
  const [result] = await pool.query("DELETE FROM players WHERE id = ?", [id]);
  return result.affectedRows;
}