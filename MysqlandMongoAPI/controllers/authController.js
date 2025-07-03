const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/database');
const { User } = require('../entities/User');


const getUserRepo = () => {
    if (!AppDataSource || !AppDataSource.isInitialized) {
        throw new Error('Database connection not established. Please ensure the database is connected.');
    }
    return AppDataSource.getRepository(User);
};


const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

       
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Get repository with error handling
        let userRepository;
        try {
            userRepository = getUserRepo();
        } catch (dbError) {
            return res.status(500).json({ 
                message: 'Database connection error', 
                error: dbError.message 
            });
        }

        // Check if user exists
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;

        const savedUser = await userRepository.save(user);

        // Generate token
        const token = generateToken(savedUser.id);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { 
                id: savedUser.id, 
                name: savedUser.name, 
                email: savedUser.email 
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ 
            message: 'Registration failed', 
            error: error.message 
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Get repository with error handling
        let userRepository;
        try {
            userRepository = getUserRepo();
        } catch (dbError) {
            return res.status(500).json({ 
                message: 'Database connection error', 
                error: dbError.message 
            });
        }

        // Find user
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            message: 'Login successful',
            token,
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email 
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Login failed', 
            error: error.message 
        });
    }
};

module.exports = { login, register };