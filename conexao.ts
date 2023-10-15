import * as mysql from 'mysql2/promise';

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: mysql.Connection | null = null;

  private constructor() {}

  // Método para obter uma instância única da conexão com o banco de dados.
  static async getInstance(): Promise<DatabaseConnection> {
    if (!this.instance) {
      this.instance = new DatabaseConnection();
      await this.instance.initConnection();
    }
    return this.instance;
  }

  // Inicializa a conexão com o banco de dados.
  private async initConnection() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '******',
      database: 'sakila',
    });
  }

  // Obtém a conexão com o banco de dados.
  getConnection(): mysql.Connection {
    if (!this.connection) {
      throw new Error('Conexão com o banco de dados não inicializada.');
    }
    return this.connection;
  }
}
