module.exports = {
  database: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pwd: process.env.DB_PWD,
    host: process.env.DB_HOST
  },
  swaggerOptions: {
    swaggerOptions: {
      defaultModelsExpandDepth: 0,
    },
  },
  bcrypt: {
    salt: process.env.SALT,
  },
  secretKeys: {
    jwt: process.env.JWT
  }
}