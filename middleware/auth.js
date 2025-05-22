const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      Admin.getById(decoded.id, (err, admin) => {
        if (err || !admin) {
          return res
            .status(401)
            .json({ message: "Not authorized, admin not found" });
        }

        const { password, ...adminData } = admin;
        req.admin = adminData;

        next();
      });
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
