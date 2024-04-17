import Header from "./Components/Header";
import "./App.css";

import { useState } from "react";
// import { Home } from "@mui/icons-material";
// import LoginForm from "./Components/LoginForrm/LoginForm";

function App() {
  const [typeOfUser, setTypeOfUser] = useState("admin");

  return (
    <div>
      <Header setUserRole={setTypeOfUser} userRole={typeOfUser}/>
    </div>
  );
}

export default App;
