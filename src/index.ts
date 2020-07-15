import express from "express";
import path from "path";
import bodyParser from "body-parser";
import userRouter from "./routes/user";
import cors from "cors";
import socket from "socket.io";
import expressStatusMonitor from "express-status-monitor";
import { connectToDatabase } from "./utils/mongo";
import "./utils/config";

const app = express();

connectToDatabase((err) => {
  if (err) return console.log(err);
});

app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, "client", "build");

  app.use(express.static(root));
  app.get("*", (_, res) => {
    res.sendFile("index.html", { root });
  });
}

// API Routes
app.use("/api/user", userRouter);

const server = app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")} 🚀`);
  console.log("  Press CTRL-C to stop\n");
});

const io = socket(server);
io.on("connection", (socket) => {
  console.log("Connected...");
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

app.set("socketio", io);

app.use(expressStatusMonitor({ websocket: io }));
