const config = {
  MONGO: {
    URI:
      process.env.MONGO_URL ||
      "mongodb://<admin>:<password>@<host>:<port>/<db name | default admin>",
    OPTIONS: { useNewUrlParser: true }
  },
  JWT: {
    secret: "uyg2hx3ub3iuzoxuo",
    expire: 3600
  },
  MAIL:{
    smtp_host:"smtp.gmail.com",
		user:"startsetteam",
		pass:"saikat95"
  },
  redisHost: '35.161.9.16',
  redisPort: 30645
};
Object.freeze(config);
module.exports = config;
