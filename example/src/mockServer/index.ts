import { createServer } from "http";
import { Server } from "socket.io";

const { PORT = 3001 } = process.env || 3001;

const httpServer = createServer();

const io = new Server(httpServer, {  
  cors: {
    origin: "*",
  },
});

const mockEnabled = {
  visible: true,
  hidden: false
}

io.on("connection", async (socket) => {  
  console.info(`client id: ${socket.id} connected`);

  const { appId, flagName, environment } = socket.handshake.query;

  const room = `${appId}/${flagName}/${environment}`
  
  socket.join(room)

  socket.nsp.to(room).emit("featureFlag:value", mockEnabled[flagName as string]);
});

httpServer.listen(PORT, () => console.info(`🚀 Server ready at http://localhost:${PORT}`));