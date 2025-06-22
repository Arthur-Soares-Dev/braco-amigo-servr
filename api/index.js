const jsonServer = require("json-server");
const cors = require("cors"); // <--- importe isso
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors()); // <--- adicione isso
server.use(middlewares);
server.use(router);

module.exports = (req, res) => {
  server(req, res);
};  