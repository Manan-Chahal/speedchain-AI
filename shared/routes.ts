import { z } from 'zod';
import { insertLeadSchema } from './schema';

export const api = {
  leads: {
    create: {
      method: 'POST' as const,
      path: '/api/leads' as const,
      input: insertLeadSchema,
      responses: {
        201: insertLeadSchema,
        400: z.object({ message: z.string() }),
      },
    },
  },
};
