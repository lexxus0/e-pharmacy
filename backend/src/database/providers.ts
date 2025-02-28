import * as mongoose from 'mongoose';
import { validateEnvVariable } from 'src/utils/env.util';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(validateEnvVariable(process.env.DB_URI, 'DB_URI')),
  },
];
