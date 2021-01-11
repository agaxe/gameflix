import styled from 'styled-components';
import React from 'react'
import { MainVisual, SectionTitle } from 'components/molecules';
import { GameList, StreamList } from 'components/organisms';

// * type 
type MainPageTempProps = {
	/** 발매 예정 게임 데이터 */
	ComingSoonData: any[],
	/** 인기 게임 리스트 데이터 */
	gameListData: any[],
	/** 실시간 방송 리스트 데이터 */
	streamListData: any[]
}

// * component
/**
 * - 메인 페이지의 템플릿 컴포넌트 입니다.
 */
function MainPageTemp({
	ComingSoonData,
	gameListData,
	streamListData
}: MainPageTempProps) {
	return (
		<>
			<MainVisual
				ComingSoonData={ComingSoonData}
			/>
			<MainPageSection>
				<div>
					<SectionTitle title="인기 게임" />
					<GameList data={gameListData} />
				</div>
				<div>
					<SectionTitle title="실시간 게임방송" />
					<StreamList data={streamListData} />
				</div>
			</MainPageSection>
		</>
	)
}
export default MainPageTemp;

// * style
// 메인 페이지 seciton
const MainPageSection = styled.section`
	padding-top:100px;
	& > div{
		margin-bottom:60px;
		&:last-of-type{
			margin-bottom:0;
		}
	}
	/* @media screen and (max-width: 768px) {
		
  		background:#f00;
		& > div{
			width: 500px;
		}
	} */
`

