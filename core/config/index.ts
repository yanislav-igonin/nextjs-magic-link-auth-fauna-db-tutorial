export const config = {
  app: {
    isProduction: process.env.NODE_ENV === "production",
  },
  email: {
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT
        ? parseInt(process.env.EMAIL_SERVER_PORT, 10)
        : 465,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      }
    },
    from: process.env.EMAIL_FROM,
    maxAge: 10 * 60, // Magic links are valid for 10 min only
  },
  fauna: {
    secret: process.env.FAUNA_SECRET_KEY || '',
    domain: 'db.eu.fauna.com',
  },
};
