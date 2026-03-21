require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const cors = require('cors');

const adminRoutes = require("./Routes/adminRoutes");
const studentRoutes = require("./Routes/studentRoutes");
const teacherRoutes = require("./Routes/teacherRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes.default ?? adminRoutes);
app.use("/api/student", studentRoutes.default ?? studentRoutes);
app.use("/api/teacher", teacherRoutes.default ?? teacherRoutes);

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
