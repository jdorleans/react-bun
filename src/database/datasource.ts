import {DataSource} from "typeorm";

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "postgres",
  logging: process.env.DB_LOGGING === "true",
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  entities: ["./src/model/*.ts"]
});