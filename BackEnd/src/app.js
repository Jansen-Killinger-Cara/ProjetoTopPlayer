import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import jogoRoutes from "./routes/jogoRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import partidaRoutes from "./routes/partidaRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// health
app.get("/", (req, res) => res.json({ ok: true, api: "Top Players API" }));

app.use("/usuarios", usuarioRoutes);
app.use("/jogos", jogoRoutes);
app.use("/players", playerRoutes);
app.use("/partidas", partidaRoutes);
app.use("/rankings", rankingRoutes);

export default app;