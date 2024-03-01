import apiClient from './apiClient';

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export const getCoins = async (): Promise<ICoin[]> => {
  const {data} = await apiClient.get<ICoin[]>('/coins');

  return data;
};

export const postCoin = async (id: number) => {
  const {data} = await apiClient.post('/coin', {id});

  return data;
};
