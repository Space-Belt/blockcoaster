import {ImageSourcePropType} from 'react-native';
import apiClient from './apiClient';

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender?: string;
  image: string;
}

export interface ICharacters {
  info: {
    count: number;
    next: string;
    pages: number;
  };
  results: ICharacter[];
}

export const getAllCharacters = async (
  page: number,
  name: string,
): Promise<ICharacters> => {
  // const endPoint =
  //   name !== ''
  //     ? `character/?page=${page}&name=${name}`
  //     : `character/?page=${page}`;
  // const {data} = await apiClient.get<ICharacters>(endPoint);

  // return data;
  console.log(page);
  console.log(name);
  try {
    const endPoint =
      name !== ''
        ? `character/?page=${page}&name=${name}`
        : `character/?page=${page}`;
    const {data} = await apiClient.get<ICharacters>(endPoint);

    return data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getCharacterById = async (id: number): Promise<ICharacter> => {
  const {data} = await apiClient.get<ICharacter>(`character/?id=${id}`);
  return data;
};

// {
//   "id": 1,
//   "name": "Rick Sanchez",
//   "status": "Alive",
//   "species": "Human",
//   "type": "",
//   "gender": "Male",
//   "origin": {
//     "name": "Earth",
//     "url": "https://rickandmortyapi.com/api/location/1"
//   },
//   "location": {
//     "name": "Earth",
//     "url": "https://rickandmortyapi.com/api/location/20"
//   },
//   "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
//   "episode": [
//     "https://rickandmortyapi.com/api/episode/1",
//     "https://rickandmortyapi.com/api/episode/2",
//     // ...
//   ],
//   "url": "https://rickandmortyapi.com/api/character/1",
//   "created": "2017-11-04T18:48:46.250Z"
// },
