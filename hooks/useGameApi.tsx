import Axios from 'axios';
import { getTwtichAccessToken } from '@/utils/getTwtichAccessToken';

type useGameApiProps = {
  endPoint: string;
  fields: string;
  where?: string;
  sort: string;
  limit?: string | number;
  offset?: number;
};

export const useGameApi = async (
  options: useGameApiProps,
  hasCount = false
) => {
  const { endPoint, fields, where, sort, limit, offset } = options;
  const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

  try {
    const accessToken = await getTwtichAccessToken();

    // api
    const fieldsValue = fields ? `fields ${fields};` : '';
    const whereValue = where ? `where ${where};` : '';
    const sortValue = sort ? `sort ${sort};` : '';
    const limitValue = limit ? `limit ${limit};` : '';
    const offsetValue = offset ? `offset ${offset};` : '';
    const optionsValue = `${fieldsValue}${whereValue}${sortValue}${limitValue}${offsetValue}`;

    const fetchInfo = {
      endpoint: hasCount ? 'multiquery' : endPoint,
      query: hasCount
        ? `
      query ${endPoint}/count "${endPoint} count"{
        ${optionsValue}
      };
      query ${endPoint} "data" {
        ${optionsValue}
      };
    `
        : optionsValue
    };

    const result = await Axios({
      url: `https://api.igdb.com/v4/${fetchInfo.endpoint}`,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Client-ID': TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`
      },
      data: fetchInfo.query
    });

    if (result instanceof Error) throw new Error(`GAME DATA ERROR`, result);

    if (!hasCount) return result.data;

    const [countData, resultData] = result.data;

    return {
      count: countData.count,
      data: resultData.result
    };
  } catch (err) {
    throw new Error(err);
  }
};
