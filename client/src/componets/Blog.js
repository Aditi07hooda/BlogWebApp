import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const useStyles = {
  font: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    width: "100%",
    margin: "auto",
    mt: 2,
    padding: 2,
    boxShadow: "5px 5px 10px #ccc",
    ":hover": {
      boxShadow: "10px 10px 20px #ccc",
    },
  },
  avatar: {
    bgcolor: "red",
  },
  iconButton: {
    marginLeft: "auto",
  },
  typography: {
    variant: "body2",
    color: "text.secondary",
  },
};

const Blog = ({ title, desc, user, id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  return (
    <Card sx={useStyles.card}>
      <Box display="flex">
        <IconButton onClick={handleEdit} sx={useStyles.iconButton}>
          <ModeEditOutlineIcon color="warning" />
        </IconButton>
      </Box>
      <CardHeader
        avatar={
          <Avatar sx={useStyles.avatar} aria-label="recipe">
            {user ? user.charAt(0) : ""}
          </Avatar>
        }
        title={title}
        subheader={user}
      />
      <CardContent>
        <hr />
        <Typography sx={useStyles.typography}>
          <b>{user}</b> {": "} {desc}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blog;
