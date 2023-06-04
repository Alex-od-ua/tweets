import React from 'react';

import styles from './TweetsCategories.module.css';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'All tweets', type: 'all' },
  { name: 'Max tweets', type: 'tweets' },
  { name: 'Max followers', type: 'followers' },
];

export const TweetsCategories = ({ value, onChangeCategory }) => {
  const navigate = useNavigate();

  const onGoBackClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.categories}>
      <button className={styles.go_back_btn} onClick={onGoBackClick}>
        Go back
      </button>
      <ul className={styles.list}>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(item.type)}
            className={[
              styles.item,
              value === item.type ? styles.active : '',
            ].join(' ')}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
