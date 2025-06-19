const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const db = require("./connections/dbConn");
const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // ⚠️ MUST come before routes
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/tapel", require("./routes/tapelRoutes"));
app.use("/api/v1/lembaga", require("./routes/lembagaRoutes"));
app.use("/api/v1/pegawai", require("./routes/pegawaiRoutes"));
app.use("/api/v1/spk", require("./routes/satuanPdkRoutes"));
app.use("/api/v1/nomorSurat", require("./routes/nomorSuratRoutes"));
app.use("/api/v1/penugasan", require("./routes/penugasanRoutes"));

app.use(errorHandler);



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
