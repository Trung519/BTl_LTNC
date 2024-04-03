import LoginForm from "./components/LoginForrm/LoginForm";
import SignUpForm from "./components/SignupForm/SignUpForm";
import { useState } from "react";
import EquipmentsManage from "./components/Equipments_Products_Manage/EquipmentsManage";
import Modal from "./components/Equipments_Products_Manage/Modal";
import "./App.css";

function App() {
  return (
    <div>
      <EquipmentsManage />
    </div>
  );
}

export default App;
