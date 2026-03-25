import { useEffect, useState } from "react";
import { rankingGeral } from "../api/rankings";

export default function RankingGeral() {
  const [limite, setLimite] = useState(10);
  const [itens, setItens] = useState([]);

  async function carregar() {
    const data = await rankingGeral(limite);
    setItens(data);
  }

  useEffect(() => { carregar(); }, [limite]);

  return (
    <div className="page">
      <h2>Ranking Geral</h2>

      <div className="row">
        <label>Limite:</label>
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
          {itens.length === 0 && (
            <tr><td colSpan="5">Sem dados ainda.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}