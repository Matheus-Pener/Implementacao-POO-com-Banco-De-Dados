import { DatabaseConnection } from './conexao';

interface FilmData {
  film_id: number;             // ID do filme
  title: string;               // Título do filme
  description: string;         // Descrição do filme
  release_year: number;        // Ano de lançamento
  language_id: number;         // ID do idioma
  original_language_id: number | null;  // ID do idioma original (pode ser nulo)
  rental_duration: number;     // Duração do aluguel
  rental_rate: string;         // Taxa de aluguel
  length: number;              // Duração do filme
  replacement_cost: string;    // Custo de substituição
  rating: string;              // Classificação
  special_features: string;    // Recursos especiais
  last_update: Date;           // Data da última atualização
}

class Film {
  constructor() {}

  // Função para listar todos os filmes no banco de dados.
  async listAllFilms(): Promise<FilmData[]> {
    const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
    const [rows] = await connection.query('SELECT * FROM film') as [FilmData[]]; // Consulta SQL
    return rows; // Retorna um array de objetos FilmData representando os filmes.
  }

  // Função para inserir um novo filme no banco de dados.
  async insertFilm(newFilm: Omit<FilmData, 'film_id'>): Promise<number | undefined> {
    const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
    const [result] = await connection.query('INSERT INTO film SET ?', newFilm); // Consulta SQL
    return result.insertId; // Retorna o ID do filme recém-inserido ou undefined se ocorrer um erro.
  }

  // Função para atualizar os dados de um filme no banco de dados com base no ID do filme.
  async updateFilm(filmId: number, updatedFilm: Partial<FilmData>): Promise<boolean> {
    const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
    const [result] = await connection.query('UPDATE film SET ? WHERE film_id = ?', [updatedFilm, filmId]); // Consulta SQL para atualização
    return result.affectedRows === 1; // Retorna true se a atualização for bem-sucedida, senão retorna false.
  }

  // Função para excluir um filme do banco de dados com base no ID do filme.
  async deleteFilm(filmId: number): Promise<boolean> {
    const connection = (await DatabaseConnection.getInstance()).getConnection(); // Obtém uma conexão com o banco de dados.
    const [result] = await connection.query('DELETE FROM film WHERE film_id = ?', filmId); // Exclusão com base no ID do filme
    return result.affectedRows === 1; // Retorna true se a exclusão for bem-sucedida, senão retorna false.
  }
}
