import { useEffect, useState } from "react";
import { listarPartidas, criarPartida, deletarPartida } from "../api/partidas";
import { listarJogos } from "../api/jogos";
import { listarPlayers } from "../api/players";

export default function Partidas() {
  const [partidas, setPartidas] = useState([]);
  const [jogos, setJogos] = useState([]);
  const [players, setPlayers] = useState([]);

  const [jogoId, setJogoId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [pontos, setPontos] = useState("");
  const [msg, setMsg] = useState("");

  async function carregarTudo() {
    const [p, j, pl] = await Promise.all([listarPartidas(), listarJogos(), listarPlayers()]);
    setPartidas(p);
    setJogos(j);
    setPlayers(pl);
  }

  useEffect(() => { carregarTudo(); }, []);

  async function adicionar(e) {
    e.preventDefault();
    setMsg("");

    if (!jogoId || !playerId || pontos === "") return setMsg("Selecione jogo, player e pontos.");

    await criarPartida({
      jogo_id: Number(jogoId),
      player_id: Number(playerId),
      pontos: Number(pontos),
    });

    setPontos("");
    setMsg("Partida registrada!");
    carregarTudo();
  }

  async function remover(id) {
    await deletarPartida(id);
    carregarTudo();
  }

  return (
    <div className="page">
      <h2>Partidas</h2>

      <form className="row" onSubmit={adicionar}>
        <select value={jogoId} onChange={(e) => setJogoId(e.target.value)}>
          <option value="">Selecione o jogo</option>
          {jogos.map((j) => <option key={j.id} value={j.id}>{j.nome}</option>)}
        </select>

        <select value={playerId} onChange={(e) => setPlayerId(e.target.value)}>
          <option value="">Selecione o player</option>
          {players.map((p) => <option key={p.id} value={p.id}>{p.nickname}</option>)}
        </select>

        <input
          type="number"
          placeholder="Pontos"
          value={pontos}
          onChange={(e) => setPontos(e.target.value)}
        />

        <button className="btn">Registrar</button>
      </form>

      {msg && <p className="hint">{msg}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Jogo</th><th>Player</th><th>Pontos</th><th>Data</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {partidas.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.jogo}</td>
              <td>{p.player}</td>
              <td>{p.pontos}</td>
              <td>{new Date(p.data_partida).toLocaleString()}</td>
              <td>
                <button className="btn danger" onClick={() => remover(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {partidas.length === 0 && (
            <tr><td colSpan="6">Nenhuma partida registrada.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}