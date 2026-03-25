import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const nav = useNavigate();

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    nav("/login");
  }

  return (
    <header className="nav">
      <div className="nav-left">
        <strong>Top Players</strong>
      </div>

      <nav className="nav-links">
        <Link to="/rankings/geral">Ranking Geral</Link>
        <Link to="/rankings/por-jogo">Ranking por Jogo</Link>
        <Link to="/partidas">Partidas</Link>
        <Link to="/players">Players</Link>
        <Link to="/jogos">Jogos</Link>
        <Link to="/usuarios">Usuários</Link>
      </nav>

      <button className="btn" onClick={sair}>Sair</button>
    </header>
  );
}