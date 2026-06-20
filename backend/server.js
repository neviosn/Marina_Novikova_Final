const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gamestore'
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MySQL Connected');
    }
});


app.post('/reviews', (req, res) => {
  const { user_id, game_id, comment, rating } = req.body;

  db.query(
    'INSERT INTO reviews (user_id, game_id, comment, rating) VALUES (?, ?, ?, ?)',
    [user_id, game_id, comment, rating],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, user_id, game_id, comment, rating });
    }
  );
});



app.get('/', (req, res) => {
  res.send('Backend is working');
});


app.get('/reviews/:game_id', (req, res) => {
  db.query(
    'SELECT reviews.*, users.email FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.game_id = ?',
    [req.params.game_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

app.get('/reviews', (req, res) => {
  db.query('SELECT * FROM reviews', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.get('/test', (req, res) => {
  res.send('TEST WORKS');
});

app.get('/games', (req, res) => {
  db.query('SELECT * FROM games', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.put('/reviews/:id', (req, res) => {
  const { comment, rating } = req.body;
  db.query(
    'UPDATE reviews SET comment = ?, rating = ? WHERE id = ?',
    [comment, rating, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ id: req.params.id, comment, rating });
    }
  );
});

app.delete('/reviews/:id', (req, res) => {
  db.query('DELETE FROM reviews WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Deleted' });
  });
});

app.put('/users/:id', (req, res) => {
  const { name, password } = req.body;
  db.query(
    'UPDATE users SET email = COALESCE(?, email), password = COALESCE(?, password) WHERE id = ?',
    [name, password || null, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Updated' });
    }
  );
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT id, email FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
      res.json(result[0]);
    }
  );
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  db.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Email already exists' });
        return res.status(500).send(err);
      }
      res.json({ id: result.insertId, email });
    }
  );
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});