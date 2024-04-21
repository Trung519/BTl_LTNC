import Header from "./Components/Header";
import "./App.css";

import { useState } from "react";
// import { Home } from "@mui/icons-material";
// import LoginForm from "./Components/LoginForrm/LoginForm";

function App() {
  const user = {
    id: localStorage.getItem('id') ? localStorage.getItem('id') : "normal",
    typeEmp: localStorage.getItem('typeEmp') ? localStorage.getItem('typeEmp') : "normal",
    name: localStorage.getItem('name') ? localStorage.getItem('name') : "normal",
    department: localStorage.getItem("department") ? localStorage.getItem("department") : "normal"
  };

  return (
    <div>
      <Header user={user}/>
    </div>
  );
}

export default App;
