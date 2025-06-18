const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const db = require("./connections/dbConn");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
  
app.use(cors());
app.use(express.json()); // ⚠️ MUST come before routes
app.use("/uploads", express.static("uploads"));

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/tapel", require("./routes/tapelRoutes"));
app.use("/api/lembaga", require("./routes/lembagaRoutes"));
app.use("/api/pegawai", require("./routes/pegawaiRoutes"));
app.use("/api/spk", require("./routes/satuanPdkRoutes"));
app.use("/api/nomorSurat", require("./routes/nomorSuratRoutes"));
app.use("/api/penugasan", require("./routes/penugasanRoutes"));

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
