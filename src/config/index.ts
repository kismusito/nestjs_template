import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  };
});
