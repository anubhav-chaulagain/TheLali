const bcrypt = require('bcrypt');

class User {
    constructor(name, contactNo, email, password, city) {
        this.name = name;
        this.contactNo = contactNo;
        this.email = email;
        this.password = password;
        this.city = city;
    }

    async insertUser() {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        const query = `
            INSERT INTO users (name, contactNo, email, password, city)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [this.name, this.contactNo, this.email, this.password, this.cityName]);
            console.log('User added:', result.rows[0]);
        } catch (error) {
            console.error('Error adding user:', error);
        }

    }

    getLogin() {
    }

    updateUser() {

    }
}

module.exports = User;