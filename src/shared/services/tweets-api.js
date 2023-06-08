import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6477b5b0362560649a2ce1ec.mockapi.io/api/',

  params: {
    limit: 6,
  },
});

export const getAllCards = async (page = 1, sort, sortByFollowing) => {
  const { data } = await instance.get('/TweetCard', {
    params: {
      page,
      sortBy: `${sort}`,
      following: `${sortByFollowing}`,
      order: 'desc',
    },
  });

  return data;
};

export const updateCard = async (id, data) => {
  const { data: result } = await instance.put(`/TweetCard/${id}`, data);
  return result;
};
