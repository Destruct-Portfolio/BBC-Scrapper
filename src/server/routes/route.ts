import { Router } from "express";
import Handlers from "../controllers/handler.js";

const router = Router();

router.post("/", Handlers.index);
router.post("/single", Handlers.single);
router.post('/month', Handlers.By_Month)
router.post('/last_week', Handlers.LastWeek)
router.post('/num_days', Handlers.Days)
router.all("*", Handlers.default);

export default router;
