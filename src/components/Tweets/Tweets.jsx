import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../../shared/Loader/Loader';
import { getAllCards } from '../../shared/services/tweets-api';
import { updateCard } from '../../shared/services/tweets-api';
import { TweetsCategories } from './TweetsCategories/TweetsCategories';
import { TweetsList } from './TweetsList/TweetsList';

import styles from './Tweets.module.css';

export const Tweets = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('all');
  const [sortByFollowing, setSortByFollowig] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const result = await getAllCards(page, sort, sortByFollowing);
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
  }, [page, sort, sortByFollowing]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const changeCategory = type => {
    if (type === sort || sortByFollowing === type) {
      return;
    }

    switch (type) {
      case 'all':
        setSort('all');
        setSortByFollowig('');
        setCards([]);
        setPage(1);
        break;

      case 'tweets':
        setSort('tweets');
        setSortByFollowig('');
        setCards([]);
        setPage(1);
        break;

      case 'followers':
        setSort('followers');
        setSortByFollowig('');
        setCards([]);
        setPage(1);
        break;

      case 'false':
        setSortByFollowig('false');
        setSort('');
        setCards([]);
        setPage(1);
        break;

      case 'true':
        setSortByFollowig('true');
        setSort('');
        setCards([]);
        setPage(1);
        break;

      default:
        break;
    }
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
        sortByFollowingValue={sortByFollowing}
        onChangeCategory={type => {
          changeCategory(type);
        }}
      />
      {cards && (
        <TweetsList cards={cards} onFollowBtnClick={onFollowBtnClick} />
      )}
      {cards && (
        <button
          onClick={() => {
            loadMore();
          }}
          className={styles.load_more_button}
          type="button"
        >
          <span className={styles.load_more_button_text}>load more</span>
        </button>
      )}

      <ToastContainer />
    </div>
  );
};
