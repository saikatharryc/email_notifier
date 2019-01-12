const config = {
  MONGO: {
    URI:
      process.env.MONGO_URL ||
      "mongodb://<admin>:<password>@<host>:<port>/<db name | default admin>",
    OPTIONS: { useNewUrlParser: true }
  },
  JWT: {
    secret: process.env.JWT_SEC,
    expire: 3600
  },
  MAIL:{
    smtp_host:process.env.SMTP_HOST,
		user:process.env.SMTP_USER,
		pass:process.env.SMTP_PASS
  },
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  API_BASE:process.env.API_BASE
};
Object.freeze(config);
module.exports = config;
