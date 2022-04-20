import Login from "./routes/login.component";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home.component";
import Register from "./routes/register.component";
import MenuAppBar from "./components/navigationBar.component";
import Profile from "./routes/profile.component";
import { useEffect, useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setName(content.username);
      setEmail(content.email);
    })();
  });

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={<MenuAppBar name={name} setName={setName} />}
      >
        <Route index element={<Home name={name} />} />
        <Route path="/login" element={<Login setName={setName} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<Profile name={name} email={email} setName={setName} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
