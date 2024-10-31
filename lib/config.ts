export const config = {
  goole_client_id: process.env.GOOGLE_CLIENT_ID! as string,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET! as string,
  jwtSecret: process.env.JWT_SECRET! as string,
  host: process.env.MAIL_HOST! as string,
  port: Number(process.env.MAIL_PORT),
  user: process.env.MAIL_USER! as string,
  pass: process.env.MAIL_PASS! as string,
};
