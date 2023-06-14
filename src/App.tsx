import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppRouter } from './routers/router.jsx';

import 'react-toastify/dist/ReactToastify.css';

import './styles/index.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <AppRouter />
    </Router>
  );
}

export default App;
