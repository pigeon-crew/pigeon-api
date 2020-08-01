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

const fetchMetadata = async (link: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${ENDPOINT}/api/links/preview`,
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        previewUrl: link,
      }),
    })
      .then((response) => {
        const meta = response.data.data;
        resolve(meta);
      })
      .catch((err) => reject(err.response));
  });
};

export { fetchMe, fetchMetadata };
