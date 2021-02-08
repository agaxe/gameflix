import { useGameApi } from 'hooks';

export default async function (req, res) {

	// * 쿼리값
	const filter = JSON.parse(req.query.filter);
	const { genresCheck, releaseDate, ratingScore, sort } = filter;

	// 배열로 변환
	const stringToArray = (string) => string.split(',');

	// 년도를 timestamp 로 변환
	const stringToTimeStamp = (year, kind) => {
		const month = (kind === 'start') ? '01/01' : '12/31';
		return Math.round(new Date(`${year}/${month} 09:00:00 GMT`).getTime() / 1000);
	}

	const releaseArray = stringToArray(releaseDate);
	const ratingArray = stringToArray(ratingScore);
	const sortArray = stringToArray(sort);

	// 필터링 조건값
	const genresValue = (genresCheck) ? `= (${genresCheck})` : '!= null';
	const releaseValue = `( first_release_date >= ${stringToTimeStamp(releaseArray[0], 'start')} & first_release_date <= ${stringToTimeStamp(releaseArray[1], 'end')} )`;
	const ratingValue = (ratingArray[0] === ratingArray[1]) ? `aggregated_rating = ${ratingArray[0]}` : `(aggregated_rating >= ${ratingArray[0]} & aggregated_rating <= ${ratingArray[1]})`;
	const sortValue = `${sortArray[0]} ${sortArray[1]}`;

	const options = {
		endPoint: 'games',
		fields: 'name, aggregated_rating, cover.image_id',
		where: `genres ${genresValue} & ${ratingValue} & ${releaseValue}`,
		sort: `${sortValue}`,
		limit: 500
	}

	// return
	const filterGameList = await useGameApi(options);
	res.json({ success: true, filterGameList });
}