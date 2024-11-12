import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import nextsteplogo from "../images/NM02 Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "./NavBar.css";

const Navbar = () => {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElMyProfile, setAnchorElMyProfile] = React.useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMyProfileMenu = (event) => {
    setAnchorElMyProfile(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseMyProfileMenu = () => {
    setAnchorElMyProfile(null);
  };

  const handleLogout = () => {
    setOpen(false);
     sessionStorage.removeItem("token");
     sessionStorage.removeItem("is_staff");
    navigate("/");
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                src={nextsteplogo}
                title="NextStep MSC"
                style={{ maxWidth: 60 }}
              />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link to="/newproject">
                  <MenuItem key={"New Project"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{"New Project"}</Typography>
                  </MenuItem>
                </Link>
                <Link to="/reports">
                  <MenuItem key={"Reports"} onClick={() => {
                      localStorage.setItem("reports", uuidv4());
                      localStorage.setItem("editableReport", 'false');
                      handleCloseNavMenu()
                    }}>
                    <Typography textAlign="center">{"Reports"}</Typography>
                  </MenuItem>
                </Link>
                { sessionStorage.getItem("is_staff")=== 'true' && (
                  <MenuItem key={"Users"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{"Users"}</Typography>
                  </MenuItem>
                )}
                { sessionStorage.getItem("is_staff") === 'true'&& (
                  <MenuItem key={"Manage Master"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      {"Manage Master"}
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              { sessionStorage.getItem("token") && (
                <Link to="/newproject">
                  <Button
                    key={"New Project"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {"New Project"}
                  </Button>
                </Link>
              )}
              { sessionStorage.getItem("token") && (
                <Link to="/reports">
                  <Button
                    key={"Reports"}
                    onClick={() => {
                      localStorage.setItem("reports", uuidv4());
                      localStorage.setItem("editableReport", 'false')
                      handleCloseNavMenu()
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {"Reports"}
                  </Button>
                </Link>
              )}
              { sessionStorage.getItem("is_staff") === 'true' && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Users">
                    <Button
                      key={"Users"}
                      onClick={handleOpenUserMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {"Users"}
                    </Button>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Link to="/signup">
                      <MenuItem
                        key={"Create New User"}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography
                          textAlign="center"
                          style={{ textDecoration: "none" }}
                        >
                          {"Create New User"}
                        </Typography>
                      </MenuItem>
                    </Link>

                    <MenuItem key={"All Users"} onClick={handleCloseNavMenu}>
                      <Link to="/allUsers">
                        <Typography textAlign="center">
                          {"All Users"}
                        </Typography>
                      </Link>
                    </MenuItem>
                  </Menu>
                </Box>
              )}

              { sessionStorage.getItem("is_staff")=== 'true' && (
                <Link to="/managemaster">
                  <Button
                    key={"Manage Master"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {"Manage Master"}
                  </Button>
                </Link>
              )}
            </Box>
            { sessionStorage.getItem("is_staff") && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="My Profile">
                  <IconButton onClick={handleOpenMyProfileMenu} sx={{ p: 0 }}>
                    <Avatar src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElMyProfile}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElMyProfile)}
                  onClose={handleCloseMyProfileMenu}
                >
                  <Link to="/myprofile">
                    <MenuItem key={"My Profile"} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{"My Profile"}</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem
                    key={"Logout"}
                    onClick={() => {
                      setOpen(true);
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">{"Logout"}</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="logoutDialog"
      >
        <DialogContent>
          <strong>Are you sure you want to logout?</strong>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleLogout();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default Navbar;
