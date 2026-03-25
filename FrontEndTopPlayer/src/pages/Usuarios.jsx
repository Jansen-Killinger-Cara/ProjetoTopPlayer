import { useEffect, useState } from "react";
import { listarUsuarios, criarUsuario, deletarUsuario, atualizarUsuario } from "../api/usuarios";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  async function carregar() {
    const data = await listarUsuarios();
    setUsuarios(data);
  }

  useEffect(() => { carregar(); }, []);

  async function adicionar(e) {
    e.preventDefault();
    setMsg("");
    if (!nome || !email || !senha) return setMsg("Preencha nome, email e senha.");

    if (editandoId) {
      await atualizarUsuario(editandoId, { nome, email, senha });
      setEditandoId(null);
      setMsg("Usuário atualizado!");
    } else {
      await criarUsuario({ nome, email, senha });
      setMsg("Usuário criado!");
    }
    setNome(""); setEmail(""); setSenha("");
    carregar();
  }

  function prepararAlterar(u) {
    setEditandoId(u.id);
    setNome(u.nome);
    setEmail(u.email);
    setSenha("");
    setMsg("");
  }

  async function remover(id) {
    await deletarUsuario(id);
    carregar();
  }

  return (
    <div className="page">
      <h2>Usuários</h2>

      <form className="row" onSubmit={adicionar}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button className="btn">{editandoId ? "Atualizar" : "Adicionar"}</button>
        {editandoId && (
          <button type="button" className="btn danger" style={{ marginLeft: "8px" }} onClick={() => { setEditandoId(null); setNome(""); setEmail(""); setSenha(""); setMsg(""); }}>Cancelar</button>
        )}
      </form>

      {msg && <p className="hint">{msg}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>Email</th><th>Criado em</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{new Date(u.criado_em).toLocaleString()}</td>
              <td>
                <button className="btn" style={{ marginRight: "8px" }} onClick={() => prepararAlterar(u)}>Alterar</button>
                <button className="btn danger" onClick={() => remover(u.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {usuarios.length === 0 && (
            <tr><td colSpan="5">Nenhum usuário.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}