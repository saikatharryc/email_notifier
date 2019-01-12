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
    user:"qh2vd6pk2sf6goa4@ethereal.email",
    pass:"xM26V8waGjpWruHpSB",
    smtp_host:"smtp.ethereal.email"
  },
  redisHost: '35.161.9.16',
  redisPort: 30645
};
Object.freeze(config);
module.exports = config;
