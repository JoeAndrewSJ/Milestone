import { Request, Response,NextFunction } from 'express';
import  AppDataSource  from '../routes/datasource';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token,'sai');
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const userRepo = AppDataSource.getRepository(User);

      const existing = await userRepo.findOneBy({ username });
      if (existing)
         res.status(400).send({ message: 'User already exists' });

      const hashed = await bcrypt.hash(password, 10);

        const newUser = userRepo.create({ username, password: hashed });
      await userRepo.save(newUser);

      res.status(201).json({ message: 'Registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

    login = async (req: Request, res: Response) :Promise<void> => {
    try {
      const { username, password } = req.body;
      
      const userRepo = AppDataSource.getRepository(User);

      const user = await userRepo.findOneBy({ username });
      if (!user) res.status(400).json({ message: 'Invalid credentials' });
    
      if (!user || !user.password) {
           res.status(400).send({ message: 'Invalid credentials' });
           return;
         
    }

    
      const match = await bcrypt.compare(password, user.password);
      if (!match)  res.status(400).send({ message: 'Invalid credentials' });

      
      const token = jwt.sign({ id: user.id }, "sai", {
        expiresIn: '1d',
      });

      console.log(username)
      res.status(200).json({ message: 'Login success', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
}

export default new AuthController();
