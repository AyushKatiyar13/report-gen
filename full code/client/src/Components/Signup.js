import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  Card,
  Button,
  InputAdornment,
  TextField,
  Grid,
  Checkbox,
  Modal,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
import "./Login.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { API_URL } from "../config";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  // const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    let body = {
      username: name,
      email: email,
      password: password,
      designation: designation,
      is_staff: isAdmin,
    };
    axios
      .post(`${API_URL}/users/users/`, body)
      .then((res) => {
        setOpen(true);
        setEmail("");
        setPassword("");
        setDesignation("");
        setName("");
        setIsAdmin(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <React.Fragment>
        <Card className="loginformdiv1">
          <FormControl
            style={{ display: "inline-block", width: "100%" }}
            onSubmit={() => handleSubmit()}
            className="loginform"
          >
            <FormGroup className="cusotmerLogin">
              <h2 style={{ margin: "auto", marginBottom: "5%" }}>Signup</h2>
              <Grid className="gridField">
                <TextField
                  required
                  id="input-with-icon-textfield"
                  label="Full Name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  id="input-with-icon-textfield"
                  label="Email Address"
                  className="emailSignupField"
                  name="emailid"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid className="gridField">
                <TextField
                  required
                  id="standard-basic"
                  label="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIndIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  id="standard-basic"
                  label="Password"
                  name="password"
                  type="password"
                  className="passwordSignupField"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid className="gridField">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    }
                  label="Admin rights"
                />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                className="btnsignup"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </FormGroup>
          </FormControl>
        </Card>
      </React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            User Created SuccessFully
            <Button
              variant="contained"
              color="primary"
              className="btnsignup"
              onClick={handleClose}
            >
              Ok
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
