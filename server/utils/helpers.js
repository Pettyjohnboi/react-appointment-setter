const bcrypt = require('bcrypt');

module.exports = { 
    hashPassword: async (password) => {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
      },
    };