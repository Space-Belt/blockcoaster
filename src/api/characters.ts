import apiClient from './apiClient';

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}
export interface ICharacterDetail extends ICharacter {
  gender: string;
  location: {
    name: string;
    url: string;
  };
}

export interface ICharacterInterface {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
export interface ICharacters {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: ICharacterInterface[];
}

export const getAllCharacters = async (
  name: string,
): Promise<ICharacterInterface[]> => {
  // V2
  const endPoint = name !== '' ? `/character/?name=${name}` : '/character';
  const forMaxPage = (await apiClient.get<ICharacters>(endPoint)).data;

  console.log(endPoint);

  console.log('dfdf');
  console.log(forMaxPage);
  const tempData = [];
  const maxPage = forMaxPage.info.pages;
  for (let i = 1; i <= maxPage; i++) {
    if (name !== '') {
      const {data} = await apiClient.get<ICharacters>(
        `/character/?page=${i}&name=${name}`,
      );
      tempData.push(...data.results);
    } else {
      const {data} = await apiClient.get<ICharacters>(`/character/?page=${i}`);
      tempData.push(...data.results);
    }
  }

  return tempData;
};

export const getCharacterById = async (
  id: number,
): Promise<ICharacterDetail> => {
  try {
    console.log('돌아');
    const {data} = await apiClient.get<ICharacterDetail>(`character/${id}`);

    return data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
