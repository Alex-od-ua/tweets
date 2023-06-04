import { nanoid } from 'nanoid';

const items = [
  {
    id: nanoid(),
    text: 'Home ',
    link: '/',
  },
  {
    id: nanoid(),
    text: 'Tweets',
    link: '/tweetsPage',
  },
];

export default items;
