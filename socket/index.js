const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
// const Message = require("../backend/models/messageModel.js");

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  //   TAKE USER_ID & SOCKET_ID FROM USER
  socket.on("addUser", (usersId) => {
    addUser(usersId, socket.id);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //   Disconnect
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });

  //   Delete MEssage
  //   socket.on("deleteMessage", (messageId) => {
  //     Message.findByIdAndRemove(messageId, (err) => {
  //       console.log(err);
  //       return;
  //     });
  //   });
});
