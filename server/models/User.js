const { pool } = require('../src/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const {
      username,
      password,
      email,
      name,
      age,
      gender,
      race,
      sexual_orientation,
      description
    } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO users (
        username, password, email, name, age, gender, 
        race, sexual_orientation, description
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, username, email, name, age, gender, 
                race, sexual_orientation, description, created_at
    `;

    const values = [
      username,
      hashedPassword,
      email,
      name,
      age,
      gender,
      race,
      sexual_orientation,
      description
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }

  static async getAll() {
    const query = `
      SELECT id, username, email, name, age, gender, 
             race, sexual_orientation, description, created_at
      FROM users 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;