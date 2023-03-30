import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./routers/router.jsx";

import './styles/index.css';

function App() {

  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App
