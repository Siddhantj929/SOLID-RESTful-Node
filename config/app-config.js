module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
  isDev: process.env.NODE_ENV == "development",
};
