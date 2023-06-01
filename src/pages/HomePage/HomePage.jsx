import { Container } from '@mui/material';

import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <Container maxWidth="xl">
      <h2 className={css.title}>Home Page</h2>
    </Container>
  );
};

export default HomePage;
