import logger from "../utils/log.js";

const log = (req, res, next) => {
  const start = new Date();

  next();

  const ms = new Date() - start;
  logger.info(
    `Method: ${req.method} | Endpoint: ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${ms} ms`
  );
};

export default log;
