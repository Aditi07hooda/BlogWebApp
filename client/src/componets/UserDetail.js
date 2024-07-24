import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Paper,
  TextField,
  Pagination,
} from "@mui/material";

const useStyles = {
  container: {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    width: "100%",
    marginBottom: "20px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  avatar: {
    bgcolor: "#3f51b5",
  },
  typography: {
    variant: "body2",
    color: "text.secondary",
  },
  sectionTitle: {
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#3f51b5",
  },
  postCard: {
    padding: "20px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  searchBox: {
    marginBottom: "20px",
  },
};

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPagePosts, setCurrentPagePosts] = useState(1);
  const [currentPageComments, setCurrentPageComments] = useState(1);
  const itemsPerPage = 8;

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}/posts`
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}/comments`
      );
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchComments();
  }, [id]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredComments = comments.filter(
    (comment) =>
      comment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPagePosts * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const indexOfLastComment = currentPageComments * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handlePageChangePosts = (event, value) => {
    setCurrentPagePosts(value);
  };

  const handlePageChangeComments = (event, value) => {
    setCurrentPageComments(value);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={useStyles.container}>
      <Card sx={useStyles.card}>
        <CardHeader
          avatar={
            <Avatar sx={useStyles.avatar} aria-label="recipe">
              {user.name ? user.name.charAt(0) : ""}
            </Avatar>
          }
          title={user.name}
          subheader={user.username}
        />
        <CardContent>
          <Typography sx={useStyles.typography}>
            <b>Email:</b> {user.email}
          </Typography>
          <Typography sx={useStyles.typography}>
            <b>Address:</b> {user.address.street}, {user.address.suite},{" "}
            {user.address.city}, {user.address.zipcode}
          </Typography>
          <Typography sx={useStyles.typography}>
            <b>Phone:</b> {user.phone}
          </Typography>
          <Typography sx={useStyles.typography}>
            <b>Website:</b> {user.website}
          </Typography>
          <Typography sx={useStyles.typography}>
            <b>Company:</b> {user.company.name}, {user.company.catchPhrase}
          </Typography>
        </CardContent>
      </Card>

      <TextField
        label="Search Posts and Comments"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={useStyles.searchBox}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={useStyles.sectionTitle}>
            Posts
          </Typography>
          <Paper elevation={3} sx={{ padding: "10px" }}>
            <List>
              {currentPosts.map((post) => (
                <React.Fragment key={post.id}>
                  <ListItem alignItems="flex-start" sx={useStyles.postCard}>
                    <ListItemText primary={post.title} secondary={post.body} />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            <Pagination
              count={Math.ceil(filteredPosts.length / itemsPerPage)}
              page={currentPagePosts}
              onChange={handlePageChangePosts}
              sx={{ marginTop: "10px" }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={useStyles.sectionTitle}>
            Comments
          </Typography>
          <Paper elevation={3} sx={{ padding: "10px" }}>
            <List>
              {currentComments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <ListItem alignItems="flex-start" sx={useStyles.postCard}>
                    <ListItemText
                      primary={comment.name}
                      secondary={comment.body}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            <Pagination
              count={Math.ceil(filteredComments.length / itemsPerPage)}
              page={currentPageComments}
              onChange={handlePageChangeComments}
              sx={{ marginTop: "10px" }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetail;
