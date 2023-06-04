import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../../shared/Loader/Loader';
import { getAllCards } from '../../shared/services/tweets-api';
import { updateCard } from '../../shared/services/tweets-api';
import { TweetsCategories } from './TweetsCategories/TweetsCategories';

import { ReactComponent as Logo } from '../../images/Vector.svg';
import { ReactComponent as Picture } from '../../images/picture2 1.svg';

import styles from './Tweets.module.css';

export const Tweets = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const results = await getAllCards(page, sort);

      setCards(prevCards => [...prevCards, ...results]);
    } catch ({ response }) {
      setError(response.data.mesage);
      toast(`${response.data.mesage}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdateCards = async (id, data, index) => {
    try {
      setLoading(true);
      const result = await updateCard(id, data);

      setCards([...cards], (cards[index].following = data.following));
      console.log(data);
      console.log(result);
      console.log(cards);
    } catch ({ response }) {
      setError(response.data.mesage);
      toast(`${response.data.mesage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [page, sort]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const changeCategory = id => {
    if (id === 'all') {
      setSort('all');
      setCards([]);
      setPage(1);
    }

    if (id === 'followers') {
      setSort('followers');
      setCards([]);
      setPage(1);
    }
    if (id === 'tweets') {
      setSort('tweets');
      setCards([]);
      setPage(1);
    }
    console.log(sort);
  };

  const onFollowBtnClick = (id, value, index) => {
    const data = { following: !value };

    fetchUpdateCards(id, data, index);
  };

  const element = cards.map(
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
          {/* <p className={styles.tweet_text}>{name} </p> */}
          <p className={styles.tweet_text}>{tweets} tweets</p>
          <p className={styles.tweet_text}>{followers} followers</p>
        </div>
        <button
          key={id}
          onClick={() => {
            onFollowBtnClick(id, following, index);
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

  return (
    <div className={styles.tweet_wrapper}>
      {error && <p className={styles.error_massage}>{error}</p>}
      {loading && <Loader />}
      <TweetsCategories
        value={sort}
        onChangeCategory={id => {
          changeCategory(id);
        }}
      />
      <ul className={styles.tweet_list}>{element}</ul>

      <button
        onClick={() => {
          loadMore();
        }}
        className={styles.load_more_button}
        type="button"
      >
        <span className={styles.load_more_button_text}>load more</span>
      </button>

      <ToastContainer />
    </div>
  );
};
