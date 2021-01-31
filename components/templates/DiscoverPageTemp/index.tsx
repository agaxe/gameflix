import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react'
import { MdTune, MdClose } from 'react-icons/md';
import { List, Item, Skeleton, CheckBox, Button, Select, NoResult } from 'components/atoms';
import { GameCard, RangeSlider, PageTitle } from 'components/molecules';
import { pxToRem } from 'static/styles/common';
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_PRIMARY, COLOR_WHITE } = VAR_COLOR;

// * type
type DiscoverPageTempProps = {
	/** 필터링 결과 리스트 */
	data: { success: boolean, filterGameList: any[] };
	/** 장르 리스트 */
	genreList: any[];
	/** 장르 선택 데이터 */
	genresCheckData: number[];
	/** 발매일 선택 데이터 */
	releaseDateData: number[];
	/** 평점 선택 데이터 */
	ratingScoreData: number[];
	/** 필터링 실행 함수 */
	searchFunc: (genres, releaseDate, ratingScore, sort) => void;
}

// * component
/**
 * - 게임들을 여러 조건로 탐색할 수 있는 탐색 페이지 입니다.
 * - 우측의 필터 아이콘을 클릭하면 게임들을 여러 조건으로 검색할 수 있는 메뉴가 생성됩니다.
 * - 탐색결과의 게임 갯수가 특정 수를 넘어가면 무한 스크롤링이 되도록 구현하였습니다.
 */
function DiscoverPageTemp({
	data,
	genreList,
	genresCheckData,
	releaseDateData,
	ratingScoreData,
	searchFunc
}: DiscoverPageTempProps) {

	const { success, filterGameList } = data;
	const { NO_COVER_IMAGE } = process.env;
	const [genresCheck, setGenresCheck] = useState(genresCheckData);
	const [releaseDate, setReleaseDate] = useState(releaseDateData);
	const [ratingScore, setRatingScore] = useState(ratingScoreData);
	const [sortValue, setSortValue] = useState([])
	const [maxLength, setMaxLength] = useState(20);
	const [filterMenuState, setFilterMenuState] = useState(false);
	const sortValueArray = [
		{ title: '평점 높은 순', value: 'aggregated_rating-desc' },
		{ title: '평점 낮은 순', value: 'aggregated_rating-asc' },
		{ title: '발매일 최신 순', value: 'first_release_date-desc' },
		{ title: '발매일 오래된 순', value: 'first_release_date-asc' },
		{ title: '이름 순', value: 'name-asc' },
	]
	const [sortFirstTitle, setSortFirstTitle] = useState(sortValueArray[0].title);

	// ref
	const GameListRef = useRef(null);

	// 장르 선택(체크) 이벤트
	const selectGenres = (e) => {
		const { name, checked } = e.target;

		if (checked) {
			setGenresCheck([...genresCheck, name])
		} else {
			setGenresCheck([...genresCheck, name].filter(item => item !== name))
		}
	}

	// 필터 검색버튼 클릭
	const runfilterSearch = () => {
		searchFunc(genresCheck, releaseDate, ratingScore, sortValue);
		window.scrollTo(0, 0)
		setFilterMenuState(false)
		setMaxLength(20);
	}

	// 필터 결과 리스트 이벤트
	const listScroll = () => {
		if (GameListRef.current) {
			const { clientHeight, offsetTop } = GameListRef.current;
			const { scrollTop } = document.documentElement
			const windowHeight = window.innerHeight;

			if (((clientHeight + offsetTop) - windowHeight) <= scrollTop) {
				setMaxLength(maxLength + 20);
			}
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", listScroll);
		return () => {
			window.removeEventListener("scroll", listScroll);
		}
	}, [maxLength])

	useEffect(() => {
		if (filterMenuState) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [filterMenuState])

	// select option 선택
	const onClickSelectOption = (e) => {
		const { name, value } = e.target.dataset;
		const arraySortValue = value.split('-');

		setSortValue(arraySortValue);
		setSortFirstTitle(name);
		searchFunc(genresCheck, releaseDate, ratingScore, arraySortValue);
	}

	return (
		<section>
			<PageTitle title="탐색">
				<MdTune onClick={() => setFilterMenuState(true)} />
			</PageTitle>
			{
				(success && filterGameList.length)
					? <>
						<PageTitleBottom>
							<GameLengthTitle>
								총
								<strong>{filterGameList.length.toLocaleString()}</strong>
								개의 게임을 발견했습니다!
							</GameLengthTitle>
							<Select
								width="150px"
								firstTitle={sortFirstTitle}
								onClick={onClickSelectOption}
								options={sortValueArray}
							/>
						</PageTitleBottom>
						<div ref={GameListRef}>
							<GameList justify="flex-start">
								{filterGameList.slice(0, maxLength).map((item, idx) => (
									<React.Fragment key={idx}>
										<GameCard
											id={item.id}
											key={idx}
											cover={item.cover ? item.cover.image_id : NO_COVER_IMAGE}
											name={item.name}
											rating={Math.round(item.aggregated_rating)}
										/>
									</React.Fragment>
								))}
							</GameList>
						</div>
					</>
					: (success && !filterGameList.length)
						? <NoResult title='탐색' />
						: <>
							<PageTitleBottom>
								<Skeleton width={500} height={30} />
								<Skeleton width={140} height={30} />
							</PageTitleBottom>
							<GameList>
								{[...Array(maxLength)].map((item, idx) => (
									<React.Fragment key={idx}>
										<GameCard skeleton />
									</React.Fragment>
								))}
							</GameList>
						</>
			}
			<>
				<FilterMenuBg state={filterMenuState} onClick={() => setFilterMenuState(false)} />
				<FilterMenuBox state={filterMenuState}>
					<FilterMenuCloseBtn onClick={() => setFilterMenuState(false)} />
					<FilterMenu>
						<div>
							<FilterMenuContent>
								<FilterMenuTitle>장르</FilterMenuTitle>
								<List direction="column">
									{genreList.map((item, idx) => (
										<React.Fragment key={idx}>
											<FilterMenuItem>
												<FilterMenuLabel htmlFor={item.name}>{item.name}</FilterMenuLabel>
												<CheckBox id={item.name} name={item.id} onClick={selectGenres} />
											</FilterMenuItem>
										</React.Fragment>
									))}
								</List>
							</FilterMenuContent>
							<FilterMenuContent>
								<FilterMenuTitle>발매일</FilterMenuTitle>
								<RangeSlider
									firstValue={releaseDate[0]}
									lastValue={releaseDate[1]}
									minRange={1970}
									maxRange={2021}
									setValue={(newValue) => setReleaseDate(newValue)}
									label={true}
								/>
							</FilterMenuContent>
							<FilterMenuContent>
								<FilterMenuTitle>평점</FilterMenuTitle>
								<RangeSlider
									firstValue={ratingScore[0]}
									lastValue={ratingScore[1]}
									setValue={(newValue) => setRatingScore(newValue)}
									label={true}
								/>
							</FilterMenuContent>
							<FilterSearchBtn onClick={runfilterSearch}>검색</FilterSearchBtn>
						</div>
					</FilterMenu>
				</FilterMenuBox>
			</>
		</section>
	)
}
export default DiscoverPageTemp;

// * style
const PageTitleBottom = styled.div`
	position:relative;
	display:flex;
	justify-content:space-between;
	padding:35px 0;
	& > div{
		position:absolute;
		right:0;
		top:33px;
		z-index:50;
	}
`
const GameLengthTitle = styled.p`
	font-size:${pxToRem(30)};
	strong{
		color:${COLOR_PRIMARY};
	}
`
const GameList = styled(List)`
	flex-wrap:wrap;
	box-sizing:border-box;
	li{
		margin-right:20px;
		margin-bottom:35px;
		&:nth-child(5n){
			margin-right:0;
		}
	}
`
const FilterMenuBg = styled.div<{ state: boolean }>`
	display:${props => props.state ? 'block' : 'none'};
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.6);
	z-index:100;
`
const filterMenuBoxWidth = '410px';
const FilterMenuBox = styled.div<{ state: boolean }>`
	position: fixed;
	right:${props => props.state ? '0' : `-${filterMenuBoxWidth}`};
	transition:right 0.3s;
	width: ${filterMenuBoxWidth};
    height: 100%;
    z-index: 100;
    top: 0;
`
const FilterMenu = styled.div`
	position:absolute;
	z-index:150;
	right:0;
	top:0;
	width : calc(${filterMenuBoxWidth} - 50px);
	height:100%;
	overflow-y:scroll;
	background:${COLOR_WHITE};
	& > div{
		width:80%;
		margin:0 auto;
		padding:45px 0px;
	}
`
const FilterMenuContent = styled.div`
	margin-bottom:40px;
	&:last-of-type{
		margin-bottom:0;
	}
`
const FilterMenuItem = styled(Item)`
	display:flex;
	justify-content:space-between;
	padding:10px 0;
`
const FilterMenuLabel = styled.label`
	width:80%;
	user-select:none;
`
const FilterMenuTitle = styled.h4`
	margin-bottom:25px;
`
const FilterSearchBtn = styled(Button)`
	width:100%;
	margin-top:65px;
`
const FilterMenuCloseBtn = styled(MdClose)`
	position:absolute;
	left:0;
	z-index:200;
	top:10px;
	color:${COLOR_WHITE};
	font-size:40px;
	cursor:pointer;
`