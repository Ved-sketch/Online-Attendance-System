import Db from '../database&auth/RTDBstruct.js'
import express from 'express';
const app = express();
import { authAdmin } from '../config/firebaseAdmin.js';

export async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No authorization header" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    try {
        const decodedToken = await authAdmin.verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}


export async function onNewClassAdd(req, res) {
    try {
        const { classId } = req.body;
        if (!req.user || !classId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await Db.onNewClassAddDatabase(req.user, classId);
        if (result == true) {
            return res.status(201).json({
                data: result,
                message: `Added to new class successfully`
            })
        } else {
            return res.status(500).json({error : "Process couldn't be done completely due to some reason" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function leavingClass(req, res) {
    try {
        const { user, classId } = req.body;
        if (!user || !classId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await Db.leavingClassDatabase(user, classId);
        if (result == true) {
            return res.status(200).json({
                data: result,
                message: `Left the class successfully`
            })
        } else {
            return res.status(500).json({error : "Process couldn't be done completely due to some reason" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

