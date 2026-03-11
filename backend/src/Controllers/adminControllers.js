import { authAdmin } from '../config/firebaseAdmin.js';
import Db from '../database&auth/RTDBstruct.js'
import express from 'express';
const app = express();

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

export async function saveUser(req, res) {
    try {
        const { role, personalInfo } = req.body;
        if (!req.user || !role || !personalInfo) {
            return res.status(400).json({ error: `there some error occured` });
        }
        const result = await Db.saveUserToRTDB(req.user, role, personalInfo);
        return res.status(201).json({
            data: result,
            message: `succefully connected with the `
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


