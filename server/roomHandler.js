const shortId = require("shortid");

const roomHandler = (io, socket, rooms) => {
  const create = (payload, callback) => {
    if (payload.type === "player") {
      const index = rooms.findIndex(
        (room) => room.vacant === true && room.private === false
      );
      if (index >= 0) {
        const room = rooms[index];
        room.players[socket.id] = {
          option: null,
          optionLock: false,
          score: 0,
        };
        room.vacant = false;
        socket.join(room.roomId);
        io.to(room.roomId).emit("room:get", room);
        callback(null, room.roomId);
      } else {
        const room = {
          roomId: shortId.generate(),
          players: {
            [socket.id]: {
              option: null,
              optionLock: false,
              score: 0,
            },
          },
          vacant: true,
          private: false,
          type: payload.type,
        };
        rooms.push(room);
        socket.join(room.roomId);
        io.to(room.roomId).emit("room:get", room);
        callback(null, room.roomId);
      }
    } else {
      const room = {
        roomId: shortId.generate(),
        players: {
          [socket.id]: {
            option: null,
            optionLock: false,
            score: 0,
          },
        },
        vacant: true,
        private: true,
        type: payload.type,
      };
      rooms.push(room);
      socket.join(room.roomId);
      io.to(room.roomId).emit("room:get", room);
      callback(null, room.roomId);
    }
  };

  socket.on("room:create", create);

};

module.exports = roomHandler;
