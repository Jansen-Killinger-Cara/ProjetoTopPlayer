import { Router } from "express";
import * as controller from "../controllers/jogoController.js";

const router = Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.remover);

export default router;