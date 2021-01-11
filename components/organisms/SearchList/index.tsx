import styled from 'styled-components';
import React from 'react'
import { List, Item } from 'components/atoms';
import { GameCard, GameItem } from 'components/molecules';

// * type
type SearchListProps = {
	/** 검색결과 데이터 */
	data: any[];
	/** 검색결과 리스트 타입 */
	type: 'list' | 'card' | string,
	/** 검색결과 데이터 존재 여부 */
	result: 'yes' | 'no' | string,
};

// * component
/**
 * - [molecules/GameCard](/docs/component-molecules-gamecard--game-card) 과
	[molecules/GameItem](/docs/component-molecules-gameitem--game-item) 를 사용한 검색결과 리스트 입니다.
 * - `type` 의 **list** 와 **card** 로 리스트 형식을 지정 합니다. 
 */
function SearchListComp({ data = [], type, result }: SearchListProps) {
	return (
		<SearchList flex={type === 'list' ? false : true}>
			{
				// 검색결과 - 리스트
				data.length && result === 'yes'
					? data.map((item, idx) => {

						// 게임 출시 년도 ( 출시하지 않았을 경우 '출시 예정' )
						const year = item.first_release_date
							? `(${new Date(item.first_release_date * 1000).getFullYear()})`
							: '정보 없음'

						return (
							<React.Fragment key={idx}>
								{
									type === 'list'
										? <GameItem
											key={idx}
											id={item.id}
											cover={item.cover ? item.cover.image_id : 'nocover_qhhlj6'}
											name={item.name}
											releaseDate={year}
										/>
										: <GameCardSearch
											id={item.id}
											cover={item.cover ? item.cover.image_id : 'nocover_qhhlj6'}
											name={item.name}
											releaseDate={year}
										/>
								}
							</React.Fragment>
						)
					})
					// 검색결과 - 로딩 스켈레톤
					: !data.length && !result
						? <>
							{[...Array(5)].map((item, idx) => (
								<React.Fragment key={idx}>
									{
										type === 'list'
											? <GameItem skeleton={true} />
											: <GameCardSearch skeleton={true} />
									}
								</React.Fragment>
							))}
						</>
						// 검색결과 - 결과 없음
						: <NotResult><h4>검색결과가 없습니다 :(</h4></NotResult>
			}
		</SearchList>
	)
}
export default SearchListComp;

// * defaultProps 
SearchListComp.defaultProps = {
	type: 'list'
};

// * style
// 검색결과 리스트
const SearchList = styled(List) <{ flex: boolean }>`
	flex-wrap:wrap;
	${props => props.flex && `margin-bottom:50px;`}
	a{
		width:100%;
	}	
`;
// 검색결과 - 카드형
const GameCardSearch = styled(GameCard)`
	margin-top:20px;
	margin-right:20px;
	&:nth-child(5n){
		margin-right:0;	
	}
`;
// 검색 결과 없음
const NotResult = styled(Item)`
	width:100%;
	text-align:center;
	display:flex;
	justify-content:center;
	align-items:center;
	min-height:400px;
	color:#cacaca;
`;





