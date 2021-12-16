import { ConnectionOptions } from "typeorm";
import { entities } from "./entities";
import { migrations } from "./migrations";

const {
  // Envvars for default database connection
  PGHOST,
  PGPORT,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,

  // Envvars for read replica database connection
  PGROHOST,
  PGROPORT,
  PGROUSER,
  PGROPASSWORD,

  NODE_ENV,
} = process.env;

export const OrmConfig = {
  // synchronize: !isProduction, // npm run migration:generate -- <MigrationName>
  logging: false,
  entities,
  migrations,
  subscribers: [],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
  },

  // Will be overwritten by env vars refer .env.example
  type: "sqlite",
  database: "./sqlite.db",
} as ConnectionOptions;
