import Header from "./Components/Header";
import "./App.css";

import { useState } from "react";
// import { Home } from "@mui/icons-material";
// import LoginForm from "./Components/LoginForrm/LoginForm";

function App() {
  const username = localStorage.getItem("username") ? localStorage.getItem("username") : "normal";

  const [typeOfUser, setTypeOfUser] = useState(username);

  return (
    <div>
      <Header setUserRole={setTypeOfUser} userRole={typeOfUser}/>
    </div>
  );
}

export default App;
