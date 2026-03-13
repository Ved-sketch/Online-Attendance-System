import admin from "firebase-admin";
import fs from "fs";
// import serviceAccount from './serviceAccountKey.json' assert { type: "json" };
const serviceAccount = JSON.parse(fs.readFileSync("./config/serviceAccountKey.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://attendance-tracker-29324-default-rtdb.firebaseio.com/"
});

// const db = admin.database();
// module.export = db ;

export const db = admin.database();
export const authAdmin = admin.auth();