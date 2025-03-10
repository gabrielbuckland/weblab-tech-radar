require("dotenv").config(); // Laden der Umgebungsvariablen
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 📌 Alle Technologien abrufen
app.get("/api/technologies", (req, res) => {
  db.all("SELECT * FROM technologies", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 📌 Neue Technologie hinzufügen
app.post("/api/technologies", (req, res) => {
  const { name, category, ring, description, is_draft } = req.body;
  db.run(
    `INSERT INTO technologies (name, category, ring, description, is_draft) VALUES (?, ?, ?, ?, ?)`,
    [name, category, ring, description, is_draft],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: this.lastID,
        name,
        category,
        ring,
        description,
        is_draft,
      });
    }
  );
});

// 📌 Bestehende Technologie aktualisieren
app.put("/api/technologies/:id", (req, res) => {
  const {
    name,
    category,
    ring,
    description,
    is_draft,
    published_at,
    modified_at,
  } = req.body;
  const { id } = req.params;
  db.run(
    `UPDATE technologies SET name = ?, category = ?, ring = ?, description = ?, is_draft = ?, published_at = ?, modified_at = ? WHERE id = ?`,
    [
      name,
      category,
      ring,
      description,
      is_draft,
      published_at,
      modified_at,
      id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: this.lastID,
        name,
        category,
        ring,
        description,
        is_draft,
        published_at,
        modified_at,
      });
    }
  );
});

// 📌 Technologie löschen
app.delete("/api/technologies/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM technologies WHERE id = ?`, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Deleted successfully" });
  });
});

// 📌 Server starten
const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
