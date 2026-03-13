import express from 'express';
const router = express.Router();
import { verifyToken, saveUser } from '../Controllers/adminControllers.js';

router.post("/signup-withgoogle", verifyToken, saveUser);

export default router;