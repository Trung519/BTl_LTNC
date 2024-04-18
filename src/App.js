import Header from "./Components/Header";
import "./App.css";
// import { Home } from "@mui/icons-material";
// import LoginForm from "./Components/LoginForrm/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Header />
      <ToastContainer />
    </div>
  );
}

export default App;
