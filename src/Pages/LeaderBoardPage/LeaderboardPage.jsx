import {
  Avatar,
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useGetUsersSortedByMaxStreakAndMinRankQuery } from "../../Redux/RTK/AuthAPI/AuthAPI";

import { LoadingScreen } from "../../Components";
import { B_Medal, CUP, G_Medal, Null_Medal, S_Medal } from "../../assets";

const mockLeaderboardData = [
  {
    _id: "1",
    Rank: 1,
    Name: "Alice",
    XP: 1500,
    CurrentLevel: 10,
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgEBjr3Tst-f06ckrV66JHwxnDGB0nop8Wg&s",
  },
  {
    _id: "2",
    Rank: 2,
    Name: "Bob",
    XP: 1200,
    CurrentLevel: 8,
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgEBjr3Tst-f06ckrV66JHwxnDGB0nop8Wg&s",
  },
  {
    _id: "3",
    Rank: 3,
    Name: "Charlie",
    XP: 1100,
    CurrentLevel: 7,
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgEBjr3Tst-f06ckrV66JHwxnDGB0nop8Wg&s",
  },
  {
    _id: "4",
    Rank: 4,
    Name: "David",
    XP: 900,
    CurrentLevel: 6,
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgEBjr3Tst-f06ckrV66JHwxnDGB0nop8Wg&s",
  },
  {
    _id: "5",
    Rank: 5,
    Name: "Eve",
    XP: 800,
    CurrentLevel: 5,
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgEBjr3Tst-f06ckrV66JHwxnDGB0nop8Wg&s",
  },
];
// Reusable Header Component
const LeaderboardHeader = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "end",
      // gap: "5px",
    }}
  >
    <img
      src={CUP}
      alt="Cup Icon"
      style={{ width: "80px", height: "80px", top: "-30px" }}
    />

    <Box
      sx={{
        flexGrow: 1,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        bgcolor: "#1A49BA",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "8px",
        p: "10px",
        boxSizing: "border-box",
        // p: "20px",
      }}
    >
      {[
        { label: "Rank", icon: "" },
        { label: "Name" },
        { label: "XP", icon: "" },
        { label: "Level", icon: "" },
      ].map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          {item.icon}
          <Typography sx={{ fontWeight: "bold" }}>{item.label}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

// Reusable Row Component
const LeaderboardRow = ({ player, index }) => {
  // Determine which medal to display based on rank
  let medalSrc = Null_Medal;
  if (player.Rank === 1) medalSrc = G_Medal; // Gold medal for 1st place
  else if (player.Rank === 2) medalSrc = S_Medal; // Silver medal for 2nd place
  else if (player.Rank === 3) medalSrc = B_Medal;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        position: "relative",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Conditional Medal Image */}
        {medalSrc && (
          <img
            src={medalSrc}
            alt="Medal Icon"
            style={{
              width: "60px",
              height: "60px",
              position: "relative",
              zIndex: 2,
            }}
          />
        )}
        {/* Avatar positioned behind the Medal */}
        <Avatar
          sx={{
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "5px", // Adjust positioning as needed
            left: "5px", // Adjust positioning as needed
            zIndex: 1, // Ensures the avatar appears behind the medal
            overflow: "hidden",
            // filter: "drop-shadow(3px 3px 0px #02216F )", // Adjust values as needed
          }}
          src={player.profile}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          bgcolor: "white",
          border: "2px solid",
          borderColor: "#02216F",
          boxShadow: "1px 2px #02216F",
          borderRadius: "8px",
          fontWeight: "bold",
          position: "relative",
          boxSizing: "border-box",
          p: "10px",
        }}
      >
        {[
          {
            label: String(player.Rank).padStart(2, "0"),
          },
          { label: player.Name },
          { label: player.XP },
          { label: player.CurrentLevel },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const LeaderboardPage = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } =
    useGetUsersSortedByMaxStreakAndMinRankQuery();
  console.log(data);

  const filteredLeaderboardData = useMemo(() => {
    if (!data.users || !Array.isArray(data.users)) return [];
    return data.users.filter((player) =>
      player.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        p: "5px",
        ml: isSm ? "10px" : "10px",
        mr: isSm ? null : "20px",
        mt: isSm ? "10px" : "10px",
        mb: isSm ? "50px" : "10px",
        pr: isSm ? "10px" : null,
        gap: "20px",
        overflow: "hidden",
      }}
    >
      {/* Leaderboard Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          boxSizing: "border-box",
          p: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#02216F",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: isSm ? "1.5rem" : "2rem",
          }}
        >
          LEADERBOARD
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "25px",
            width: isSm ? "90%" : "50%",
            padding: "5px 10px",
            border: "2px solid",
            borderColor: "#02216F",
          }}
        >
          <SearchIcon sx={{ color: "#02216F", marginX: "8px" }} />
          <input
            placeholder="Search Profile"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "8px",
              fontSize: "16px",
              color: "#B0B0B0",
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#FFDA55", borderBottomWidth: 2 }} />
      <Box>
        <Box
          sx={{
            p: isSm ? "10px" : "20px",
            display: "flex",
            flexDirection: "column",
            flexGrow: 0,
          }}
        >
          <LeaderboardHeader />
        </Box>

        <Box
          sx={{
            p: isSm ? "10px" : "20px",
            overflowX: "auto",
            overflowY: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            flexDirection: "column",
            borderTopWidth: "2px",
            borderRightWidth: "0",
            borderBottomWidth: "0",
            borderLeftWidth: "0",
            borderStyle: "solid",

            borderColor: "#02216F",
            flexGrow: 1,
            borderRadius: "10px",
            gap: "5px",
            // bgcolor: "#F6FBFF",
            // boxShadow: "3px 4px #02216F",
            scrollbarWidth: "none", // For Firefox
            "&::-webkit-scrollbar": {
              display: "none",
              height: "8px",
              backgroundColor: "#f5f5f5",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "10px",
            },
          }}
        >
          {!isLoading ? (
            filteredLeaderboardData.length > 0 ? (
              // data?.users?.map((user, index) => (
              filteredLeaderboardData?.map((user, index) => (
                <LeaderboardRow key={user._id} player={user} index={index} />
              ))
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                  mt: 2,
                  color: "#1A49BA",
                  fontWeight: "bold",
                }}
              >
                No players found
              </Typography>
            )
          ) : (
            <LoadingScreen />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LeaderboardPage;
