require('reflect-metadata');
const express = require('express');
const dotenv = require('dotenv');
const { startmysql } = require('./config/database');
const { connectMongoDB } = require('./config/mongodb');
const authRoutes = require('./routes/authRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());



app.use('/api/auth', authRoutes);




app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});


const startServer = async () => {
    try {
        await startmysql();     
        await connectMongoDB()
        
        app.listen(PORT, () => {
            console.log(`server listing ${PORT}`);
        });
    } catch (error) {
        console.error('failed to start server:', error);
    }
};

startServer();