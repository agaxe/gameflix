import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GameCard } from 'components/molecules';

// * type
type GameListProps = {
	/** 게임 리스트 데이터 */
	data: any[];
	className?: string;
}

// * component
/**
 * - [molecules/GameCard](/docs/component-molecules-gamecard--game-card) 의 
 * 	카드형 리스트 컴포넌트 입니다.
 */
function GameList({ data, className }: GameListProps) {

	const [GameList, setGameList] = useState([])

	useEffect(() => {
		data && setGameList(data);
	}, [data])

	return (
		<GameListBox className={className}>
			<>
				{
					GameList.length
						? GameList.map((item, idx) => (
							<GameCard
								id={item.id}
								key={idx}
								cover={item.cover.image_id}
								name={item.name}
								rating={item.aggregated_rating}
							/>
						))
						: <>
							{[...Array(5)].map((item, idx) => (
								<GameCard key={idx} skeleton={true} />
							))}
						</>
				}
			</>
		</GameListBox>
	)
}
export default GameList;

// * defaultProps
GameList.defaultProps = {
	data: []
}

// * style
const GameListBox = styled.ul`
	display:flex;
	justify-content:space-between;
`
