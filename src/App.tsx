import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRouter } from "./routers/router.jsx";

import "./styles/index.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <AppRouter />
    </Router>
  );
}

export default App;
