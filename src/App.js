import Header from "./Components/Header";
import "./App.css";

// import { Home } from "@mui/icons-material";
// import LoginForm from "./Components/LoginForrm/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = {
    id: localStorage.getItem('id') ? localStorage.getItem('id') : "normal",
    typeEmp: localStorage.getItem('typeEmp') ? localStorage.getItem('typeEmp') : "normal",
    name: localStorage.getItem('name') ? localStorage.getItem('name') : "normal",
    department: localStorage.getItem("department") ? localStorage.getItem("department") : "normal"
  };

  return (
    <div>
      <Header user={user} />
      <ToastContainer />
    </div>
  );
}

export default App;
