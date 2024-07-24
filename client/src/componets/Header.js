import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  useTheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = useTheme();

  const lightHeaderBg = "linear-gradient(45deg, rgb(156, 39, 176), rgb(25, 118, 210))";
  const darkHeaderBg = "#36454F";

  const currentBgColor = isDark ? darkHeaderBg : lightHeaderBg;

  return (
    <AppBar position="sticky" sx={{ background: currentBgColor, padding: 1 }}>
      <Toolbar>
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, cursor: "pointer", textDecoration: "none", color: "inherit" }}
          component={Link}
          to="/"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          BlogsApp
        </Typography>
        <IconButton
          onClick={() => dispatch(setDarkmode(!isDark))}
          sx={{ color: theme.palette.common.white }}
        >
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
