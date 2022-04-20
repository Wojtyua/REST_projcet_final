import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, InputLabel } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { OutlinedInput } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { Navigate } from "react-router-dom";

const Profile = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    email: props.email,
    allowEdit: true,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleAllowEdit = () => {
    setValues({
      ...values,
      allowEdit: !values.allowEdit,
    });
  };

  const deleteUser = async () => {
    const response = await fetch("http://localhost:8000/api/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    props.setName("");
    setRedirect(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get("email");
    let password = data.get("password");

    const response = await fetch("http://localhost:8000/api/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const content = await response.json();
    console.log(content);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {"Twoje dane: " + props.name}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            fullWidth
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoFocus
            value={values.email}
            onChange={handleChange("email")}
            disabled={values.allowEdit}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleAllowEdit}>
                  <EditIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <br />
          <br />
          <InputLabel>Zmień hasło</InputLabel>
          <OutlinedInput
            fullWidth
            name="password"
            id="password"
            type="password"
            placeholder="Nowe hasło"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Zapisz zmiany
          </Button>

          <Button
            onClick={deleteUser}
            color="error"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            USUŃ KONTO
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
