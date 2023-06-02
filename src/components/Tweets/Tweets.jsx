import { useEffect, useState } from 'react';

import { ReactComponent as Logo } from '../../images/Vector.svg';
// import { ReactComponent as Boy } from '../../images/Boy.svg';
import { ReactComponent as Picture } from '../../images/picture2 1.svg';
import Boy from '../../images/Boy.png';

import { getAllCards } from '../../shared/services/tweets-api';

import styles from './Tweets.module.css';

export const Tweets = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      // if (movies.length !== 0) {
      //   return;
      // }
      try {
        setLoading(true);
        const results = await getAllCards();
        setCards(results);
      } catch ({ response }) {
        setError(response.data.mesage);
        // toast(`${response.data.mesage}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [setCards]);

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
    </li>
  ));

  return (
    <div>
      <ul className={styles.tweet_list}>{element}</ul>
    </div>
  );
};

//  <div className={styles.tweet_card}>
//         <Logo className={styles.logo} />
//         <Picture className={styles.picture} />
//         {/* <Boy className={styles.boy} /> */}
//         <div className={styles.center_decor}>
//           <div className={styles.user_decor}>
//             <img></img>
//           </div>
//           {/* <img className={styles.boy_img} src={Boy} alt="boy" /> */}
//         </div>
//       </div>
//       <div className={styles.tweet_card}></div>
//       <div className={styles.tweet_card}></div>

//  <div className={styles.tweet_card}>
//   <Logo className={styles.logo} />
//   <Picture className={styles.picture} />
//   {/* <Boy className={styles.boy} /> */}
//   <div className={styles.center_decor}>
//     <div className={styles.user_decor}>
//       <img src={avatar}></img>
//     </div>
//     {/* <img className={styles.boy_img} src={Boy} alt="boy" /> */}
//   </div>
// </div>;

// <li className={styles.tweet_card}>
//           <Logo className={styles.logo} />
//           <Picture className={styles.picture} />
//           {/* <Boy className={styles.boy} /> */}
//           <div className={styles.center_decor}>
//             <div className={styles.user_decor}>
//               <img></img>
//             </div>
//             {/* <img className={styles.boy_img} src={Boy} alt="boy" /> */}
//           </div>
//         </li>

//         <li className={styles.tweet_card}>
//           <Logo className={styles.logo} />
//           <Picture className={styles.picture} />
//           {/* <Boy className={styles.boy} /> */}
//           <div className={styles.center_decor}>
//             <div className={styles.user_decor}>
//               <img></img>
//             </div>
//             {/* <img className={styles.boy_img} src={Boy} alt="boy" /> */}
//           </div>
//         </li>

//         <li className={styles.tweet_card}>
//           <Logo className={styles.logo} />
//           <Picture className={styles.picture} />
//           {/* <Boy className={styles.boy} /> */}
//           <div className={styles.center_decor}>
//             <div className={styles.user_decor}>
//               <img></img>
//             </div>
//             {/* <img className={styles.boy_img} src={Boy} alt="boy" /> */}
//           </div>
//         </li>
