// const jsonServer = require("json-server");
// const path = require("path");

// const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, "db.json")); // <-- atualizado
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(router);

// module.exports = (req, res) => {
//   server(req, res);
// };
const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Copia o db.json original (read-only) para o diretório /tmp (writable)
const sourcePath = path.join(__dirname, "db.json");
const tmpPath = path.join("/tmp", "db.json");

// Garante que só copia uma vez
if (!fs.existsSync(tmpPath)) {
  const data = fs.readFileSync(sourcePath, "utf-8");
  fs.writeFileSync(tmpPath, data);
}

const router = jsonServer.router(tmpPath); // usa o caminho temporário

server.use(middlewares);
server.use(router);

module.exports = (req, res) => {
  server(req, res);
};
