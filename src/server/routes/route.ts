import { Router } from "express";
import Handlers from "../controllers/handler.js";

const router = Router();

router.post("/", Handlers.index);
router.post("/single", Handlers.single);
router.all("*", Handlers.default);
export default router;
