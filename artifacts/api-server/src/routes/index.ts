import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import tasksRouter from "./tasks";
import membersRouter from "./members";
import analyticsRouter from "./analytics";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(tasksRouter);
router.use(membersRouter);
router.use(analyticsRouter);

export default router;
