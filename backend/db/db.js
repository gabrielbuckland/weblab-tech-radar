const sqlite3 = require("sqlite3").verbose();

const dbFile = "backend/db/sqlite.db";
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS technologies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    ring TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
});

const seedTechnologies = () => {
  const technologies = [
    {
      name: "Angular",
      category: "Languages & Frameworks",
      ring: "Adopt",
      description: "Ein weit verbreitetes Web-Framework von Google.",
    },
    {
      name: "React",
      category: "Languages & Frameworks",
      ring: "Adopt",
      description:
        "Eine deklarative JavaScript-Bibliothek für Benutzeroberflächen.",
    },
    {
      name: "Vue.js",
      category: "Languages & Frameworks",
      ring: "Trial",
      description:
        "Ein progressives Framework für die Erstellung von Web-Interfaces.",
    },
    {
      name: "Docker",
      category: "Platforms",
      ring: "Adopt",
      description: "Ein Werkzeug zur Containerisierung von Anwendungen.",
    },
    {
      name: "Kubernetes",
      category: "Platforms",
      ring: "Trial",
      description:
        "Ein Open-Source-System zur Verwaltung von Container-Anwendungen.",
    },
    {
      name: "SQLite",
      category: "Tools",
      ring: "Adopt",
      description: "Eine leichtgewichtige relationale Datenbank ohne Server.",
    },
  ];

  db.get("SELECT COUNT(*) as count FROM technologies", (err, row) => {
    if (err) {
      console.error("Fehler beim Überprüfen der DB:", err.message);
      return;
    }

    if (row.count === 0) {
      console.log("Füge Beispieldaten in die DB ein...");

      const stmt = db.prepare(
        "INSERT INTO technologies (name, category, ring, description) VALUES (?, ?, ?, ?)"
      );

      technologies.forEach((tech) => {
        stmt.run(
          tech.name,
          tech.category,
          tech.ring,
          tech.description,
          (err) => {
            if (err)
              console.error(
                `Fehler beim Einfügen von ${tech.name}:`,
                err.message
              );
          }
        );
      });

      stmt.finalize(() => {
        console.log("Beispieldaten erfolgreich hinzugefügt.");
        db.close();
      });
    } else {
      // db.close();
    }
  });
};

seedTechnologies();

module.exports = db;
