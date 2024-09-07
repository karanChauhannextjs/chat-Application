import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [socketId, setSocketId] = useState();

  console.log(socket, "wfejk");
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });
    socket.on("receiveMessage", (s) => {
      console.log(s);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>{socketId}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          name="inputField"
          placeholder="Enter text here"
          required
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="text"
          value={room}
          name="inputField2"
          placeholder="Enter room id"
          required
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
