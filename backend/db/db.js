const sqlite3 = require('sqlite3').verbose();

const dbFile = 'backend/db/sqlite.db';
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)'
  );
});

function insertMockUsers() {
  const names = ['Gabriel', 'Lorena', 'Emma', 'Oli'];

  for (let i = 0; i < 10; i++) {
    db.run('INSERT INTO users (name) VALUES (?)', [names[i % names.length]]);
  }
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        console.error('❌ Fehler beim Abrufen der Benutzer:', err.message);
        reject(err);
      } else {
        console.log('✅ Benutzer erfolgreich abgerufen:', rows);
        resolve(rows);
      }
    });
  });
}

insertMockUsers();
getAllUsers()
  .then((users) => console.log('Benutzer:', users))
  .catch((err) => console.error('Fehler:', err));

module.exports = db;
