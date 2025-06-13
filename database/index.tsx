import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { migrateDbIfNeeded } from './schema';
import { ReactNode, FC, useState } from 'react';

export { useSQLiteContext };

export const DatabaseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);

  return (
    <SQLiteProvider
      databaseName="app-v2.db"
      onInit={async (db) => {
        await migrateDbIfNeeded(db);
        setReady(true);
      }}
    >
      {ready ? children : null}
    </SQLiteProvider>
  );
};
