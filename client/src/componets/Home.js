import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, Card, CardContent, CardMedia, Grid } from "@mui/material";

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  const fetchFeaturedPosts = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=3");
      setFeaturedPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to BlogsApp
      </Typography>
      <Typography variant="h6" align="center" paragraph>
        Discover and share amazing stories from around the world.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <Button component={Link} to="/blogs" variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Browse All Blogs
        </Button>
        <Button component={Link} to="/users" variant="contained" color="secondary">
          Browse All Users
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        Featured Posts
      </Typography>
      <Grid container spacing={4}>
        {featuredPosts.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={`https://picsum.photos/300/200?random=${post.id}`}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.body.substring(0, 100)}...
                </Typography>
                <Button component={Link} to={`/myBlogs/${post.id}`} size="small" color="primary">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
