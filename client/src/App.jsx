import "./App.css";
import { useState, useEffect, createContext } from "react";
import Router from "./Router";
import axios from "./Api/axios";

export const AppState = createContext();
function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  // console.log(token);
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      setUser(data);
      // console.log(user);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      // console.log(error.response);
      localStorage.removeItem("user");
      setUser({});
    }
  }

  useEffect(() => {
    checkUser();
  }, [user]);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Router />
    </AppState.Provider>
  );
}

export default App;
