import { connect, disconnect } from './database';

const testConnection = async () => {
  try {
    const client = await connect();

    // Use the native MongoDB client to list databases
    const adminDb = client.db().admin();
    const { databases } = await adminDb.listDatabases();

    console.log('Databases in the cluster:');
    databases.forEach((db: { name: string }) => console.log(db.name));

    await disconnect();
  } catch (err) {
    console.error('Error during database connection test:', err);
    process.exit(1);
  }
};

testConnection();
