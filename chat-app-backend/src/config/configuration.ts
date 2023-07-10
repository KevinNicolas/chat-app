export interface IEnvVariables {
  database_uri: string;
}

export default {
  database: () => ({
    database_uri: process.env.DATABASE_URI,
  }),
};
