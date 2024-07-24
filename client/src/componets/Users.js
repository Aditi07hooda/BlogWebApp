import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortOrder === "nameAsc") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "nameDesc") {
      return b.name.localeCompare(a.name);
    } else if (sortOrder === "idAsc") {
      return a.id - b.id;
    } else if (sortOrder === "idDesc") {
      return b.id - a.id;
    }
    return 0;
  });

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mr: 2 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="nameAsc">Name (Ascending)</MenuItem>
            <MenuItem value="nameDesc">Name (Descending)</MenuItem>
            <MenuItem value="idAsc">ID (Ascending)</MenuItem>
            <MenuItem value="idDesc">ID (Descending)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {sortedUsers.map((user) => (
          <User
            key={user.id}
            id={user.id}
            name={user.name}
            username={user.username}
            email={user.email}
            address={user.address}
            phone={user.phone}
            website={user.website}
            company={user.company}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Users;
