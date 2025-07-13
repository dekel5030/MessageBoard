let messages = [
  {
    id: 1,
    author: "Dekel",
    date: "10/07/25 14:32",
    message: "Hey everyone! Welcome to the new message board 😄",
  },
  {
    id: 2,
    author: "Admin",
    date: "11/07/25 09:00",
    message: "Please keep discussions respectful and constructive.",
  },
  {
    id: 3,
    author: "Maya",
    date: "12/07/25 16:45",
    message: "Does anyone know how to deploy an Express app to Heroku?",
  },
];

let nextId = messages.length + 1;

function formatDate(date) {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function getAllMessages() {
  return messages;
}

function getMessageById(id) {
  return messages.find((msg) => msg.id === id);
}

function addMessage(author, message) {
  const newMessage = {
    id: nextId++,
    author,
    date: formatDate(new Date()),
    message,
  };
  messages.push(newMessage);
  return newMessage;
}

function deleteMessage(id) {
  const index = messages.findIndex((msg) => msg.id === id);
  if (index !== -1) {
    return messages.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  getAllMessages,
  getMessageById,
  addMessage,
  deleteMessage,
};
