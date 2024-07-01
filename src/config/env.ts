import { createEnv } from '@t3-oss/env-nextjs';
import { string } from 'zod';

export const env = createEnv({
  server: {
    CLIMATIQ_API_KEY: string(),
  },
  runtimeEnv: {
    CLIMATIQ_API_KEY: process.env.CLIMATIQ_API_KEY,
  },
});
