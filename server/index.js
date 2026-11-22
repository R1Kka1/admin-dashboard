const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const JWT_SECRET = 'dev-secret-please-change';

const authMiddleware = (req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).json({ message: '未登录' });
  }
  const token = authHeader.split(' ')[1];

  try{
    const payload = jwt.verify(token,JWT_SECRET);
    req.user = payload;
    next();
  }catch(err){
    return res.status(401).json({message : 'token 无效或过期'});
  }
}
  


app.use(cors());
app.use(express.json());

const db = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db.json'), 'utf-8'));
const users = db.users.map((u) => ({
  ...u,
  passwordHash: bcrypt.hashSync(u.password, 10),
}));

app.get('/hello', (req, res) => {
  res.json({ message: 'hello from Node' });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: '用户名或密码错误' });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: '用户名或密码错误' });
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email, role: user.role },
  });
});

app.get('/api/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.listen(3002, () => {
  console.log('server on 3002');
});
