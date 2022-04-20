import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function MenuAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    handleClose();

    props.setName("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
            <MenuItem>HOME</MenuItem>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {props.name ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/profile"
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>

                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/"
                >
                  <MenuItem onClick={logout}>Log Out</MenuItem>
                </Link>
              </Menu>
            </div>
          ) : (
            <div>
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                to="/register"
              >
                <Button color="inherit">register</Button>
              </Link>
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                to="/login"
              >
                <Button color="inherit">Login</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
