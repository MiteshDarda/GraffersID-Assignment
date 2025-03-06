import { Pool } from 'pg';
import configuration from './configuration';

// Get the config
const config = configuration();

// Create and export the pool instance
export const pool = new Pool({
  user: config.database.username,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port,
});

// Add event handlers for pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
