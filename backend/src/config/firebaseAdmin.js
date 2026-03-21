import admin from "firebase-admin";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, "serviceAccountKey.json"), "utf8"));

if (!admin.apps.length) admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://attendance-tracker-29324-default-rtdb.firebaseio.com/"
});

// const db = admin.database();
// module.export = db ;

export const db = admin.database();
export const authAdmin = admin.auth();