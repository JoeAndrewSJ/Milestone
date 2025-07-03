const mongoose = require('mongoose');

 const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect( 'mongodb://localhost:27017/products_db');
        console.log(`mongodb connt: ${conn.connection.host}`);
    } catch (error) {
        console.error('mongodb connection error:', error);
        throw error;
    }
};
module.exports={connectMongoDB};