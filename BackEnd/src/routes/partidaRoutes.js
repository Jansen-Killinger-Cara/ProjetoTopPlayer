import { Router } from "express";
import * as controller from "../controllers/partidaController.js";

const router = Router();

router.get("/", controller.listar);
router.post("/", controller.criar);
router.delete("/:id", controller.remover);

export default router;