const express = require('express');
const cors = require('cors');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

let db = null;
const dbPath = path.join(__dirname, 'usersDB.db');

const app = express();
app.use(cors());
app.use(express.json());

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        app.listen(3000, () => {
            console.log('Server Running at http://localhost:3000/');
        });
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};
initializeDBAndServer();

app.get('/users', async (req, res) => {
  const { page, limit = 25 } = req.query;
  const offset = (page - 1) * limit;
  const users = await db.all(`SELECT * FROM users LIMIT ? OFFSET ?`, [limit, offset]);
  res.status(200).json(users);
});

app.post('/users', async (req, res) => {
  try {
    const { firstname, lastname, email, department } = req.body;
    await db.run(
      `INSERT INTO users (firstname, lastname, email, department) VALUES (?, ?, ?, ?)`,
      [firstname, lastname, email, department]
    );
    res.status(201).json({ message: 'User Added Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, department } = req.body;
    await db.run(
      `UPDATE users SET firstname = ?, lastname = ?, email = ?, department = ? WHERE id = ?`,
      [firstname, lastname, email, department, id]
    );
    res.json({ message: 'User Updated Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.run(`DELETE FROM users WHERE id = ?`, [id]);
    res.json({ message: 'User Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.patch('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {email,firstname,lastname,department} = req.body;

    await db.run(
      `UPDATE users SET email = ?, firstname = ?, lastname = ?, department = ? WHERE id = ?`,
      [email, firstname, lastname, department, id]
    );
    res.json({ message: 'User Updated Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
