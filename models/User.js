const bcrypt = require('bcrypt');

class User {
    constructor(name, contactno, email, password, city) {
        this.name = name;
        this.contactno = contactno;
        this.email = email;
        this.password = password;
        this.city = city;
    }

    async insertUser() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

    }

    getLogin() {
    }

    updateUser() {

    }
}

module.exports = User;