import { pool } from "../config/db.js";

export async function listarPartidas() {
  const [rows] = await pool.query(`
    SELECT p.id, p.jogo_id, j.nome AS jogo, p.player_id, pl.nickname AS player,
           p.pontos, p.data_partida
    FROM partidas p
    JOIN jogos j ON j.id = p.jogo_id
    JOIN players pl ON pl.id = p.player_id
    ORDER BY p.data_partida DESC
  `);
  return rows;
}

export async function criarPartida({ jogo_id, player_id, pontos, data_partida }) {
  const [result] = await pool.query(
    "INSERT INTO partidas (jogo_id, player_id, pontos, data_partida) VALUES (?, ?, ?, ?)",
    [jogo_id, player_id, pontos, data_partida || new Date()]
  );
  return result.insertId;
}

export async function deletarPartida(id) {
  const [result] = await pool.query("DELETE FROM partidas WHERE id = ?", [id]);
  return result.affectedRows;
}