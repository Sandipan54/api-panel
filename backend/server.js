const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let tokens = [];

app.get('/api/tokens', (req, res) => {
  res.json(tokens);
});

app.post('/api/tokens', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token is required' });

  tokens.push(token);
  res.status(201).json({ message: 'Token added' });
});

app.delete('/api/tokens/:token', (req, res) => {
  const { token } = req.params;
  tokens = tokens.filter(t => t !== token);
  res.json({ message: 'Token deleted' });
});

app.listen(PORT, () => {
  console.log(`API Panel running on http://localhost:${PORT}`);
});
