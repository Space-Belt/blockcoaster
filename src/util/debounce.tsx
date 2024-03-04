// * 디바운스 함수 호출

import {Dispatch, SetStateAction} from 'react';

// * 커스텀 디바운스 함수
// export const debounce = (callback: (...args: any[]) => void, delay: number) => {
export const debounce = (callback: any, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
