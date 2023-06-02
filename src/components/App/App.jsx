import { BrowserRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';

import NavBar from '../NavBar/NavBar';
import UserRoutes from './UserRoutes';

// import styles from './App.module.css';

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(current());
  // }, [dispatch]);

  return (
    <BrowserRouter basename="/tweets">
      <NavBar />
      <UserRoutes />
    </BrowserRouter>
  );
};

export default App;
