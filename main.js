const express = require ("express");
const app = express();
const { router_products } = require("./routes/products");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const serverPort = 8080;
const { products } = require("./routes/products");
Contenedor: File = require ("./modules/contenedor");
const msgs = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/products", router_products);
app.io = io;
httpServer.listen(serverPort, () => {
    console.log(`Servidor activo y escuchando en puerto ${serverPort}`);
}).on("error", error => console.log(error.message));

io.on("connection", (socket) => {
    console.log("User connected");
    io.sockets.emit("renderProducts", products.getProducts().content);
    socket.on("chatMsg", (msg) => {
        msg = JSON.parse(msg);
        const d = new Date();
        msg.time = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
        const logMsgs = new File("./logmsgs.txt");
        logMsgs.save(msg);
        msgs.push(msg);
        io.sockets.emit("newChatMsg", JSON.stringify(msgs));
    });
});