import { DatabaseConnection } from "./conexao";

interface StoreData {
    store_id: number;          // ID da loja
    manage_staff_id: number;   // ID do gerente da loja
    address_id: number;       // ID do endereço da loja
    last_update: Date;        // Data da última atualização
}

class Store {
    constructor() {}

    // Função para listar todas as lojas no banco de dados.
    async listAllStores(): Promise<StoreData[]> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
        const [rows] = await connection.query('SELECT * FROM store') as [StoreData[]]; // Consulta SQL
        return rows; // Retorna um array de objetos StoreData representando as lojas.
    }

    // Função para atualizar os dados de uma loja no banco de dados com base no ID da loja.
    async updateStore(store_id: number, updatedStore: Partial<StoreData>): Promise<boolean> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
        const [result] = await connection.query('UPDATE store SET ? WHERE store_id = ?', [updatedStore, store_id]); // Consulta SQL para atualização
        return result.affectedRows === 1; // Retorna true se a atualização for bem-sucedida, senão retorna false.
    }

    // Função para inserir uma nova loja no banco de dados.
    async insertStore(newStore: Omit<StoreData, 'store_id'>): Promise<number | undefined> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
        const [result] = await connection.query('INSERT INTO store SET ?', newStore); // Consulta SQL
        return result.insertId; // Retorna o ID da loja recém-inserida ou undefined se ocorrer um erro.
    }

    // Função para excluir uma loja do banco de dados com base no ID da loja.
    async deleteStore(store_id: number): Promise<boolean> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
        const [result] = await connection.query('DELETE FROM store WHERE store_id = ?', store_id); // Exclusão com base no ID da loja
        return result.affectedRows === 1; // Retorna true se a exclusão for bem-sucedida, senão retorna false.
    }
}
