import Axios from 'axios';
import { getTwtichAccessToken } from '@/utils/getTwtichAccessToken';

type useGameApiProps = {
  endPoint: string;
  fields: string;
  where?: string;
  sort: string;
  limit?: string | number;
};

export const useGameApi = async (options: useGameApiProps) => {
  const { endPoint, fields, where, sort, limit } = options;
  const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

  try {
    const accessToken = await getTwtichAccessToken();

    // api
    const fieldsValue = fields ? `fields ${fields};` : '';
    const whereValue = where ? `where ${where};` : '';
    const sortValue = sort ? `sort ${sort};` : '';
    const limitValue = limit ? `limit ${limit};` : '';
    const optionsValue = `${fieldsValue}${whereValue}${sortValue}${limitValue}`;

    const result = await Axios({
      url: `https://api.igdb.com/v4/${endPoint}`,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Client-ID': TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`
      },
      data: optionsValue
    });

    if (result instanceof Error) throw new Error(`GAME DATA ERROR`, result);

    return result.data;
  } catch (err) {
    throw new Error(err);
  }
};
