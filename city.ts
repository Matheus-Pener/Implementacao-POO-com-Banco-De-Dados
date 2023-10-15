import { DatabaseConnection } from "./conexao";

interface CityData {
    city_id: number;          // ID da cidade
    city: string;             // Nome da cidade
    country_id: number;       // ID do país da cidade
    last_update: Date;        // Data da última atualização
}

class City {
    constructor() {}

    // Função para listar todas as cidades no banco de dados.
    async ListAllCity(): Promise<CityData[]> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
        const [rows] = await connection.query('SELECT * FROM city') as [CityData[]]; // Consulta SQL
        return rows; // Retorna um array de objetos CityData representando as cidades.
    }

    // Função para atualizar os dados de uma cidade no banco de dados com base no ID da cidade.
    async UpdateCity(city_id: number, UpdatedCity: Partial<CityData>): Promise<boolean> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
        const [result] = await connection.query('UPDATE city SET ? WHERE city_id = ?', [UpdatedCity, city_id]); // Consulta SQL para atualização
        return result.affectedRows === 1; // Retorna true se a atualização for bem-sucedida, senão retorna false.
    }

    // Função para inserir uma nova cidade no banco de dados.
    async InsertCity(newCity: Omit<CityData, 'city_id'>): Promise<number | undefined> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
        const [result] = await connection.query('INSERT INTO city SET ?', newCity); // Consulta SQL
        return result.insertId; // Retorna o ID da cidade recém-inserida ou undefined se ocorrer um erro.
    }

    // Função para excluir uma cidade do banco de dados com base no ID da cidade.
    async deleteCity(city_id: number): Promise<boolean> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
        const [result] = await connection.query('DELETE FROM city WHERE city_id = ?', city_id); // Exclusão com base no ID da cidade
        return result.affectedRows === 1; // Retorna true se a exclusão for bem-sucedida, senão retorna false.
    }
}
