import { NavLink } from 'react-router-dom';
import { Container } from '@mui/material';

import items from './items';

import css from './NavBar.module.css';

const NavBar = () => {
  const elements = items.map(({ id, text, link }) => (
    <li key={id}>
      <NavLink className={css.link} to={link}>
        {text}
      </NavLink>
    </li>
  ));

  return (
    <div className={css.navbar}>
      <Container maxWidth="xl">
        <div className={css.navbar_items}>
          <ul className={css.menu}>{elements}</ul>
          <div className={css.navbar_auth}></div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
