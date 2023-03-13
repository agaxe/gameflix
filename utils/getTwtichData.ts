import Axios from 'axios';
import { getTwtichAccessToken } from './getTwtichAccessToken';

export const getTwtichData = async (endPoint: string) => {
  const accessToken = await getTwtichAccessToken();

  try {
    const result = await Axios({
      url: `https://api.twitch.tv/helix/${endPoint}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`
      }
    });
    return result.data;
  } catch (error) {
    throw new Error('TWITCH DATA ERROR');
  }
};
