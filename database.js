const pool = require("./db");

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

async function getAllMessages() {
  const result = await pool.query("SELECT * FROM messages ORDER BY id ASC");
  return result.rows.map((msg) => ({
    ...msg,
    date: formatDate(msg.date),
  }));
}

async function getMessageById(id) {
  const result = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
  if (result.rows.length === 0) return null;
  const msg = result.rows[0];
  return { ...msg, date: formatDate(msg.date) };
}

async function addMessage(author, message) {
  const now = new Date();
  const result = await pool.query(
    "INSERT INTO messages (author, date, message) VALUES ($1, $2, $3) RETURNING *",
    [author, now, message]
  );
  const msg = result.rows[0];
  return { ...msg, date: formatDate(msg.date) };
}

async function deleteMessage(id) {
  const result = await pool.query(
    "DELETE FROM messages WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rows.length === 0) return null;
  const msg = result.rows[0];
  return { ...msg, date: formatDate(msg.date) };
}

module.exports = {
  getAllMessages,
  getMessageById,
  addMessage,
  deleteMessage,
};
