const DATABASE_NAME = 'softuni-tutorials';

const config = {
    PORT: 4000,
    DB_URI: `mongodb://localhost/${DATABASE_NAME}`,
    SALT_ROUNDS: 10,
    SECRET: 'STAVAMNOGOSOLENO',
    COOKIE_NAME: 'TOKEN',
};

module.exports = config;