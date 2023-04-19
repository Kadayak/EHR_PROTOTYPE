const logger = (req, res, next) => {
    console.log("request sent to", req.originalUrl);
    next();
};
export default logger;
//# sourceMappingURL=logger.js.map