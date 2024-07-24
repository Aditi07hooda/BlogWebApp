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

const User = ({ id, name, username, email, address, phone, website, company }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/users/${id}`);
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
            {name ? name.charAt(0) : ""}
          </Avatar>
        }
        title={name}
        subheader={username}
      />
      <CardContent>
        <Typography sx={useStyles.typography}><b>Email:</b> {email}</Typography>
        <Typography sx={useStyles.typography}><b>Address:</b> {address.street}, {address.suite}, {address.city}, {address.zipcode}</Typography>
        <Typography sx={useStyles.typography}><b>Phone:</b> {phone}</Typography>
        <Typography sx={useStyles.typography}><b>Website:</b> {website}</Typography>
        <Typography sx={useStyles.typography}><b>Company:</b> {company.name}, {company.catchPhrase}</Typography>
      </CardContent>
    </Card>
  );
};

export default User;
