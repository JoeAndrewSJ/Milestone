
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sequelize=require('../config/database')




const JWT_SECRET = 'hello123';
const JWT_REFRESH_SECRET = 'refresh123';

let refreshTokens = [];

exports.register = async(req, res) => {
  const { username, password } = req.body;
  if (!username || !password) 
  {
    return res.status(400).json({ message: 'All params required' });
  }
  try {
  
    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'user already avail' });

    const hashed = bcrypt.hashSync(password, 10);

    
    await User.create({ username, password: hashed });

    res.status(201).json({ message: 'user registered' });
  } catch (error) {
    res.status(500).json({ message: 'reg failed' });
  }

}

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).json({ message: " provide username and password" });

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Wrong info" });

   
    const accessToken = jwt.sign(
      { id: user.id, username },
      JWT_SECRET,
      { expiresIn: '1m' }
    );

   
    const refreshToken = jwt.sign(
      { id: user.id, username },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    
    refreshTokens.push(refreshToken);

    res.json({
      message: 'login succuess',
      accessToken,
      refreshToken
    });
  } catch (error) {
    
   
  }
};
exports.getuser = async (req, res) => {
  try {
    const { username } = req.body;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const pureToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    const isvalid = jwt.verify(pureToken, JWT_SECRET);

    const avail = await User.findOne({ where: { username } }); 
    if (!avail) {
      return res.status(400).json({ message: "No available user" });
    }

    return res.status(200).json({
      message: "User found",
      user: { id: avail.id, username: avail.username }  
    });

  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (e.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    
  }
};

exports.refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token)
  {
     return res.status(403).json({ message: 'refersh token required' });
  }
  if (!refreshTokens.includes(token))
  {
     return res.status(403).json({ message: 'Invalid refresh token' });
  }

  try {
    const pl = jwt.verify(token, JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: pl.id, username: pl.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ accessToken: newAccessToken });
    


  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};



