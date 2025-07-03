const { AppDataSource } = require('./data-source');
require('reflect-metadata');

const startmysql = async () => {
    try {
        await AppDataSource.initialize();
        console.log('MySQL connected');
    } catch (err) {
        console.error('MySQL connection error:', err);
    }
};

module.exports = { AppDataSource,startmysql };
