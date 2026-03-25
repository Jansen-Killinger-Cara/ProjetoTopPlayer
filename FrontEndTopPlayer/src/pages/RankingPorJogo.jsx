import { useEffect, useState } from "react";
import { listarJogos } from "../api/jogos";
import { rankingPorJogo } from "../api/rankings";

export default function RankingPorJogo() {
  const [jogos, setJogos] = useState([]);
  const [jogoId, setJogoId] = useState("");
  const [limite, setLimite] = useState(10);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    listarJogos().then(setJogos);
  }, []);

  async function carregar() {
    if (!jogoId) return setItens([]);
    const data = await rankingPorJogo(jogoId, limite);
    setItens(data);
  }

  useEffect(() => { carregar(); }, [jogoId, limite]);

  return (
    <div className="page">
      <h2>Ranking por Jogo</h2>

      <div className="row">
        <select value={jogoId} onChange={(e) => setJogoId(e.target.value)}>
          <option value="">Selecione o jogo</option>
          {jogos.map((j) => <option key={j.id} value={j.id}>{j.nome}</option>)}
        </select>

        <input type="number" value={limite} onChange={(e) => setLimite(e.target.value)} />
        <button className="btn" onClick={carregar}>Atualizar</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>#</th><th>Player</th><th>Plataforma</th><th>Total Pontos</th><th>Partidas</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((x, idx) => (
            <tr key={x.player_id}>
              <td>{idx + 1}</td>
              <td>{x.nickname}</td>
              <td>{x.plataforma}</td>
              <td>{x.total_pontos}</td>
              <td>{x.total_partidas}</td>
            </tr>
          ))}
          {jogoId && itens.length === 0 && (
            <tr><td colSpan="5">Sem dados para esse jogo.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}