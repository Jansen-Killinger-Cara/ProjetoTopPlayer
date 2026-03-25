import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function entrar(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const resp = await loginRequest(email, senha);
      localStorage.setItem("token", resp.token);
      localStorage.setItem("usuario", JSON.stringify(resp.usuario));
      nav("/");
    } catch (e) {
      setErro(e?.response?.data?.msg || "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={entrar}>
        <h2>Login</h2>

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Senha</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

        {erro && <p className="error">{erro}</p>}

        <button className="btn" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}