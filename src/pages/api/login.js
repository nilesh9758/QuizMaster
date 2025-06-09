import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_here';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    await connectToDatabase(); 
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { sub: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
