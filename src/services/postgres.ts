import { Client } from "pg";
import { DatabaseConfig } from "../interfaces";
import { logger } from "./";

export class Postgres {
  private client: Client;
  private databaseConfig: DatabaseConfig;

  constructor( databaseConfig:DatabaseConfig) {
    this.databaseConfig = databaseConfig;
    this.client = new Client(this.databaseConfig);
  }

  public async connect(): Promise<void> {
    try {
      await this.client.connect();
      logger.info("Connection to the database established.");
    } catch (error) {
      logger.error(error);
    }
  }

  public async close(): Promise<void> {
    try {
      await this.client.end();
      this.client = new Client(this.databaseConfig);
      logger.info("Connection to the database terminated");
    } catch (error) {
      logger.error(error);
    }
  }

  public async query(query): Promise<any> {
    try {
      const result = await this.client.query(query);
      if (typeof result !== "undefined") {
        return result;
      }
      logger.error("Query did not return results");
    } catch (error) {
      logger.error(error);
    }
    return null;
  }
}
