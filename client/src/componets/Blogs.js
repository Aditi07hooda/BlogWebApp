import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { TextField, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBlogs = filteredBlogs.sort((a, b) => {
    if (sortOrder === "titleAsc") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "titleDesc") {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === "userAsc") {
      return a.userId - b.userId;
    } else if (sortOrder === "userDesc") {
      return b.userId - a.userId;
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
          label="Search Blogs"
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
            <MenuItem value="titleAsc">Title (Ascending)</MenuItem>
            <MenuItem value="titleDesc">Title (Descending)</MenuItem>
            <MenuItem value="userAsc">User ID (Ascending)</MenuItem>
            <MenuItem value="userDesc">User ID (Descending)</MenuItem>
            <MenuItem value="idAsc">ID (Ascending)</MenuItem>
            <MenuItem value="idDesc">ID (Descending)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            id={blog.id}
            title={blog.title}
            desc={blog.body}
            user={`User ${blog.userId}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Blogs;
