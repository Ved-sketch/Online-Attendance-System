import express from "express";
import cors from "cors";
import adminRoutes from "./Routes/adminRoutes.js";
import teacherRoutes from "./Routes/teacherRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// In app.js
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);


app.listen(5000, () => {
    console.log("Server running on port 5000");
});