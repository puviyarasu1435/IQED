import React, { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
} from "@mui/material";
import { useSocket } from "../../../Socket/SocketContext";
import { useLoaderData } from "react-router-dom";
import { LobbyContainer } from "../../../Components";

const MatchLobby = () => {
  const socket = useSocket();
  const loaderData = useLoaderData();

  const [PlayerName, setPlayerName] = useState("");
  const [RoomCode, setRoomCode] = useState("");
  const [Players, setPlayers] = useState([]);
  const [open, setopen] = useState(true);

  useMemo(() => {
    const matchData = JSON.parse(sessionStorage.getItem("MatchData"));
    console.log(matchData);
    if (loaderData == "User") {
      setPlayerName(matchData.Name);
      setRoomCode(matchData.roomCode);
      setPlayers(matchData);
    }
  }, [loaderData]);

  useEffect(() => {
    socket.on("playerJoined", (Players) => {
      console.log(Players);
      setPlayers([]);
      setPlayers(Players);
    });
    return () => {
      socket.off("playerJoined");
    };
  }, []);

  const handleGuestJoin = () => {
    socket.emit(
      "GuestjoinRoom",
      { RoomCode: RoomCode, PlayerName: PlayerName },
      (response) => {
        console.log(response);
        setPlayers(response);
        setopen(false);
      }
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems:'self-start',
        height:'100%',
        width: "100%",
      }}
    >
      <LobbyContainer />

      <Dialog open={loaderData == "Guest" && open}>
        <DialogTitle>Join the Lobby</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Enter your name"
            fullWidth
            variant="outlined"
            value={PlayerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <TextField
            autoFocus
            label="Room Code"
            fullWidth
            variant="outlined"
            value={RoomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleGuestJoin}
            disabled={!PlayerName || !RoomCode || Players.length > 2}
            color="primary"
            variant="contained"
          >
            Join Lobby
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MatchLobby;

export const OnLoadLobby = () => {
  const matchData = JSON.parse(sessionStorage.getItem("MatchData"));
  if (matchData) {
    return "User";
  } else {
    return "Guest";
  }
};
