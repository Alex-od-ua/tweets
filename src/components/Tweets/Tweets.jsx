import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../shared/Loader/Loader';

import { ReactComponent as Logo } from '../../images/Vector.svg';
// import { ReactComponent as Boy } from '../../images/Boy.svg';
import { ReactComponent as Picture } from '../../images/picture2 1.svg';
// import Boy from '../../images/Boy.png';

import { getAllCards } from '../../shared/services/tweets-api';

import styles from './Tweets.module.css';

export const Tweets = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const results = await getAllCards(page);
        setCards(prevCards => [...prevCards, ...results]);
      } catch ({ response }) {
        setError(response.data.mesage);
        toast(`${response.data.mesage}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [page, setCards]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const element = cards.map(({ name, tweets, followers, avatar, id }) => (
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
      <button className={styles.tweet_button}>
        <span className={styles.tweet_button_text}>follow</span>
      </button>
    </li>
  ));

  return (
    <div className={styles.tweet_wrapper}>
      {error && <p className={styles.error_massage}>{error}</p>}
      {loading && <Loader />}
      <ul className={styles.tweet_list}>{element}</ul>

      <button
        onClick={loadMore}
        className={styles.load_more_button}
        type="button"
      >
        <span className={styles.load_more_button_text}>load more</span>
      </button>
      <ToastContainer />
    </div>
  );
};
