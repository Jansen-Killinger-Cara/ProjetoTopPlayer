import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import Jogos from "./pages/Jogos.jsx";
import Players from "./pages/Players.jsx";
import Partidas from "./pages/Partidas.jsx";
import RankingGeral from "./pages/RankingGeral.jsx";
import RankingPorJogo from "./pages/RankingPorJogo.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/rankings/geral" replace />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="jogos" element={<Jogos />} />
        <Route path="players" element={<Players />} />
        <Route path="partidas" element={<Partidas />} />
        <Route path="rankings/geral" element={<RankingGeral />} />
        <Route path="rankings/por-jogo" element={<RankingPorJogo />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}