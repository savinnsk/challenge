import 'dotenv';

export default () => ({
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
});
