import React from 'react';

import styles from './TweetsCategories.module.css';

const categories = [
  { name: 'All tweets', type: 'all' },
  { name: 'Max tweets', type: 'tweets' },
  { name: 'Max followers', type: 'followers' },
];

export const TweetsCategories = ({ value, onChangeCategory }) => {
  return (
    <div className={styles.categories}>
      {/* <p></p> */}
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
