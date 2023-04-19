const logger = (req, res, next) => {
  console.log("request sent to", req.originalUrl);
  next();
};

module.exports = logger;
