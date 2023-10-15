import { DatabaseConnection } from "./conexao";

interface ActorData {
    actor_id: number;    // ID do ator 
    first_name: string;  // Nome do ator
    last_name: string;   // Sobrenome do ator
    last_update: Date;   // Data da última atualização
}

class Actor {
    constructor() {}

    // Função para listar todos os atores no banco de dados.
    async listAllActors(): Promise<ActorData[]> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); //Conexão com o banco de dados.
        const [rows] = await connection.query('SELECT * FROM actor') as [ActorData[]]; //Consulta SQL
        return rows; //Retorna um array de objetos ActorData representando os atores.
    }

    // Função para inserir um novo ator no banco de dados.
    async insertActor(newActor: Omit<ActorData, 'actor_id'>): Promise<number | undefined> { 
        const connection = (await DatabaseConnection.getInstance()).getConnection(); //Conexão com o banco de dados.
        const [result] = await connection.query('INSERT INTO actor SET ?', newActor);//Consulta SQL
        return result.insertId; // Retorna o ID do ator recém-inserido ou undefined se ocorrer um erro.
    }

    // Função para atualizar os dados de um ator no banco de dados com base no ID do ator.
    async updateActor(actorId: number, updatedActor: Partial<ActorData>): Promise<boolean> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
        const [result] = await connection.query('UPDATE actor SET ? WHERE actor_id = ?', [updatedActor, actorId]); //Consulta SQL para atualização
        return result.affectedRows === 1; // Retorna true se a atualização for bem-sucedida, senão retorna false.
    }

    // Função para excluir um ator do banco de dados com base no ID do ator.
    async deleteActor(actorId: number): Promise<boolean> {
        const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
        const [result] = await connection.query('DELETE FROM actor WHERE actor_id = ?', actorId);//Exclusão com base no ID do ator
        return result.affecedRows === 1; // Retorna true se a exclusão for bem-sucedida, senão retorna false.
    }
}
