import jwt from "jsonwebtoken";
import { UserToken } from "../routes/auth/user.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Authorization is missing" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: err.message });

    let { cpr, iat, exp } = user;

    const userToken: UserToken = {
      cpr: cpr,
      iat: iat,
      exp: exp,
    };

    req.user = userToken; // here, the user info is added to the request, so that it can be used in other endpoints.
    next();
  });
};

export default authenticateToken;
