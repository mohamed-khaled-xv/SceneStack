import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { migrateDbIfNeeded } from './schema';
import { ReactNode, FC } from 'react';

export { useSQLiteContext };

export const DatabaseProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <SQLiteProvider databaseName="app.db" onInit={migrateDbIfNeeded}>
    {children}
  </SQLiteProvider>
);
