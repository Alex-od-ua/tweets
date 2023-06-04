import { ReactComponent as Logo } from '../../../images/Vector.svg';
import { ReactComponent as Picture } from '../../../images/picture2 1.svg';

import styles from './TweetsList.module.css';

export const TweetsList = ({ cards, onFollowBtnClick }) => {
  const numberWithCommas = item => {
    return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const elements = cards.map(
    ({ name, tweets, followers, avatar, id, following }, index) => (
      <li key={id} className={styles.tweet_card}>
        <Logo className={styles.logo} />
        <Picture className={styles.picture} />

        <div className={styles.center_decor}>
          <div className={styles.user_decor}>
            <img
              className={styles.avatar_img}
              src={avatar}
              alt="user avatar"
            ></img>
          </div>
        </div>
        <div className={styles.tweet_info}>
          <p className={styles.tweet_text}>{numberWithCommas(tweets)} tweets</p>
          <p className={styles.tweet_text}>
            {numberWithCommas(followers)} followers
          </p>
        </div>
        <button
          key={id}
          onClick={() => {
            onFollowBtnClick(id, following, index, name);
          }}
          className={[
            styles.tweet_button,
            following ? styles.tweet_button_selected : '',
          ].join(' ')}
        >
          {following ? 'following' : 'follow'}
        </button>
      </li>
    )
  );

  return <ul className={styles.tweet_list}>{elements}</ul>;
};
