import * as React from 'react';
import { ENDPOINT } from '../utils/config';
import axios from 'axios';

const fetchMe = async (accessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${ENDPOINT}/api/users/me`,
      method: 'GET',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        const me = res.data.data;
        resolve(me);
      })
      .catch((err) => reject(err.response));
  });
};

export { fetchMe };
