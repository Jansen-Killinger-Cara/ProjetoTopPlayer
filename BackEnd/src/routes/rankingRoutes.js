import { Router } from "express";
import * as controller from "../controllers/rankingController.js";

const router = Router();

router.get("/geral", controller.geral);
router.get("/jogo/:jogoId", controller.porJogo);

export default router;