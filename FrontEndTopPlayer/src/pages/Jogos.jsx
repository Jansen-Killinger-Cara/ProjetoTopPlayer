import { useEffect, useState } from "react";
import { listarJogos, criarJogo, deletarJogo, atualizarJogo } from "../api/jogos";

export default function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [msg, setMsg] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  async function carregar() {
    const data = await listarJogos();
    setJogos(data);
  }

  useEffect(() => { carregar(); }, []);

  async function adicionar(e) {
    e.preventDefault();
    setMsg("");
    if (!nome || !genero) return setMsg("Preencha nome e gênero.");

    if (editandoId) {
      await atualizarJogo(editandoId, { nome, genero });
      setEditandoId(null);
      setMsg("Jogo atualizado!");
    } else {
      await criarJogo({ nome, genero });
      setMsg("Jogo criado!");
    }
    setNome(""); setGenero("");
    carregar();
  }

  function prepararAlterar(j) {
    setEditandoId(j.id);
    setNome(j.nome);
    setGenero(j.genero);
    setMsg("");
  }

  async function remover(id) {
    await deletarJogo(id);
    carregar();
  }

  return (
    <div className="page">
      <h2>Jogos</h2>

      <form className="row" onSubmit={adicionar}>
        <input placeholder="Nome do jogo" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Gênero (FPS, Battle Royale...)" value={genero} onChange={(e) => setGenero(e.target.value)} />
        <button className="btn">{editandoId ? "Atualizar" : "Adicionar"}</button>
        {editandoId && (
          <button type="button" className="btn danger" style={{ marginLeft: "8px" }} onClick={() => { setEditandoId(null); setNome(""); setGenero(""); setMsg(""); }}>Cancelar</button>
        )}
      </form>

      {msg && <p className="hint">{msg}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>Gênero</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {jogos.map((j) => (
            <tr key={j.id}>
              <td>{j.id}</td>
              <td>{j.nome}</td>
              <td>{j.genero}</td>
              <td>
                <button className="btn" style={{ marginRight: "8px" }} onClick={() => prepararAlterar(j)}>Alterar</button>
                <button className="btn danger" onClick={() => remover(j.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {jogos.length === 0 && (
            <tr><td colSpan="4">Nenhum jogo cadastrado.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}