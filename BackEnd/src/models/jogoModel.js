import { pool } from "../config/db.js";

export async function listarJogos() {
  const [rows] = await pool.query("SELECT id, nome, genero FROM jogos ORDER BY id DESC");
  return rows;
}

export async function buscarJogoPorId(id) {
  const [rows] = await pool.query("SELECT id, nome, genero FROM jogos WHERE id = ?", [id]);
  return rows[0];
}

export async function criarJogo({ nome, genero }) {
  const [result] = await pool.query(
    "INSERT INTO jogos (nome, genero) VALUES (?, ?)",
    [nome, genero]
  );
  return result.insertId;
}

export async function atualizarJogo(id, { nome, genero }) {
  const [result] = await pool.query(
    "UPDATE jogos SET nome = ?, genero = ? WHERE id = ?",
    [nome, genero, id]
  );
  return result.affectedRows;
}

export async function deletarJogo(id) {
  const [result] = await pool.query("DELETE FROM jogos WHERE id = ?", [id]);
  return result.affectedRows;
}