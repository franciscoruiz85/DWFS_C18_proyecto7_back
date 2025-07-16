const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      msg: "No tienes autorización para acceder a este recurso",
    });
  }
  try {
    const openToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log('openToken ', openToken);
    req.user = openToken.user;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token inválido o expirado",
      error: error.message,
    });
  }
};
