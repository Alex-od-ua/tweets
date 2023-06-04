import { BrowserRouter } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import UserRoutes from './UserRoutes';

// import styles from './App.module.css';

const App = () => {
  return (
    <BrowserRouter basename="/tweets">
      <NavBar />
      <UserRoutes />
    </BrowserRouter>
  );
};

export default App;
