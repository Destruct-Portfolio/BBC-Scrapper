import { Router } from "express";
import Handlers from "../controllers/handler.js";
const router = Router();
router.post("/", Handlers.index);
router.get("*", Handlers.default);
export default router;
