import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = Router();

router.post("/login", usuarioController.login); // <-- ADD AQUI (antes do /:id)
router.get("/", usuarioController.listar);

router.get("/:id", usuarioController.buscarPorId);

router.post("/", usuarioController.criar);

router.put("/:id", usuarioController.atualizar);

router.delete("/:id", usuarioController.remover);

export default router;