import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';

const bootstrap = async () => {
  await connectDatabase();
  const app = createApp();

  const PORT = env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`User service ready at http://localhost:${PORT}`);
  });
};

bootstrap();
