import express from 'express'
const router = express.Router();
import {verifyToken,onNewClassAdd,leavingClass} from '../Controllers/studentControllers.js'
router.post('/newclass-enroll',verifyToken,onNewClassAdd);
router.post('/leaving-class',leavingClass);

export default router;