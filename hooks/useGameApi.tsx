import Axios from 'axios';

type useGameApiProps = {
  endPoint: string;
  fields: string;
  where?: string;
  sort: string;
  limit?: string | number;
};

export const useGameApi = async (options: useGameApiProps) => {
  const { endPoint, fields, where, sort, limit } = options;

  // 공통 변수
  const TWITCH_ACCESS_TOKEN_URL = process.env.TWITCH_ACCESS_TOKEN_URL;
  const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

  return new Promise(async (resolve, reject) => {
    const access_token = await Axios.post(TWITCH_ACCESS_TOKEN_URL).then(
      (res) => res.data.access_token
    );

    if (!access_token) reject(new Error(`TWITCH ACCESS TOKEN ERROR`));

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
        Authorization: `Bearer ${access_token}`
      },
      data: optionsValue
    });

    if (!result?.data) reject(new Error(`GAME DATA NOT FOUND`));

    resolve(result.data);
  });
};
