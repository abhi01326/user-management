import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
            console.log('Server Running ');
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
const frontendPath = path.join(__dirname, "../user-management-dashboard/build");
app.use(express.static(frontendPath));

app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "../um_frontend/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../um_frontend/dist/index.html"));
});

