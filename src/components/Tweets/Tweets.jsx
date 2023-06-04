import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../../shared/Loader/Loader';
import { getAllCards } from '../../shared/services/tweets-api';
import { updateCard } from '../../shared/services/tweets-api';
import { TweetsCategories } from './TweetsCategories/TweetsCategories';
import { TweetsList } from './TweetsList/TweetsList';

// import { ReactComponent as Logo } from '../../images/Vector.svg';
// import { ReactComponent as Picture } from '../../images/picture2 1.svg';

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
      const result = await getAllCards(page, sort);
      console.log(result);
      setCards(prevCards => [...prevCards, ...result]);

      if (!result.length) {
        toast('it`s all cards');
      }
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

      setCards(
        [...cards],
        ((cards[index].following = data.following),
        (cards[index].followers = result.followers))
      );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onFollowBtnClick = (id, value, index, name) => {
    if (value === true) {
      const data = { followers: cards[index].followers - 1, following: false };
      fetchUpdateCards(id, data, index);
      toast('Unfollow');
    }
    if (value === false) {
      const data = { followers: cards[index].followers + 1, following: true };
      fetchUpdateCards(id, data, index);

      toast(`Follow for ${name}`);
    }
  };

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
      {cards && (
        <TweetsList cards={cards} onFollowBtnClick={onFollowBtnClick} />
      )}

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
