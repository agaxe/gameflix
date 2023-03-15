import { useGameApi } from '@/hooks/useGameApi';

export default async function handler(req, res) {
  const {
    checkedGenres,
    releaseDate,
    ratingScore,
    sortValue,
    page = 1
  } = req.query;

  // 배열로 변환
  const stringToArray = (string) => string.split(',');

  // 년도를 timestamp 로 변환
  const stringToTimeStamp = (year, kind) => {
    const month = kind === 'start' ? '01/01' : '12/31';
    return Math.round(
      new Date(`${year}/${month} 09:00:00 GMT`).getTime() / 1000
    );
  };

  const releaseArray = stringToArray(releaseDate);
  const ratingArray = stringToArray(ratingScore);
  const sortArray = stringToArray(sortValue);

  // 필터링 조건값
  const genresValue = checkedGenres ? `= (${checkedGenres})` : '!= null';
  const releaseValue = `( first_release_date >= ${stringToTimeStamp(
    releaseArray[0],
    'start'
  )} & first_release_date <= ${stringToTimeStamp(releaseArray[1], 'end')} )`;
  const ratingValue =
    ratingArray[0] === ratingArray[1]
      ? `aggregated_rating = ${ratingArray[0]}`
      : `(aggregated_rating >= ${ratingArray[0]} & aggregated_rating <= ${ratingArray[1]})`;

  const limit = 20;
  const offset = limit * (page - 1);

  const options = {
    endPoint: 'games',
    fields: 'name, aggregated_rating, cover.image_id',
    where: `genres ${genresValue} & ${ratingValue} & ${releaseValue}`,
    sort: `${sortArray[0]} ${sortArray[1]}`,
    limit,
    offset
  };

  const data = await useGameApi(options, true);

  res.json({
    success: true,
    count: data.count,
    games: data.data
  });
}
