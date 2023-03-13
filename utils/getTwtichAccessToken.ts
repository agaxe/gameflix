import Axios from 'axios';
import { TWITCH_ACCESS_TOKEN_URL } from '@/common/variables';

let accessToken = '';

export const getTwtichAccessToken = async () => {
  const client_id = process.env.TWITCH_CLIENT_ID;
  const client_secret = process.env.TWITCH_SECRET_ID;

  if (!accessToken) {
    try {
      const newAccessToken = await Axios.post(TWITCH_ACCESS_TOKEN_URL, {
        client_id,
        client_secret,
        grant_type: 'client_credentials'
      });

      accessToken = newAccessToken.data.access_token;
    } catch (error) {
      throw new Error(`TWITCH ACCESS TOKEN ERROR`);
    }
  }

  return accessToken;
};
