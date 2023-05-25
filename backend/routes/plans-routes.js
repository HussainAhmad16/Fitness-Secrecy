import express from "express";
import { addDietPlan, getDietPlans,getDietPlanById } from "../controller/plans-controller";
import upload from '../middleware/multer.mjs';


const PlansRouter = express.Router();

PlansRouter.post('/postDietPlan', upload.single('image'), addDietPlan);

PlansRouter.get('/',getDietPlans);
PlansRouter.get('/:id',getDietPlanById);

export default PlansRouter;
