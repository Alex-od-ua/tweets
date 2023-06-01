import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6477b5b0362560649a2ce1ec.mockapi.io/api/',
});

export const getAllCards = async () => {
  const { data } = await instance.get('/TweetCard');
  return data;
};

export const updateCard = async data => {
  const { data: result } = await instance.put(`/TweetCard/${id}`, data);
  return result;
};

export const deleteCard = async id => {
  const { data } = await instance.delete(`/TweetCard/${id}`);
  return data;
};
