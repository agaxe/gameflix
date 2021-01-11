import styled from 'styled-components';
import React from 'react'
import Link from 'next/link'
import { Skeleton } from 'components/atoms';
import { STYLE_BOX_SHADOW, STYLE_ELLIPSIS } from 'static/styles/common';
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_WHITE } = VAR_COLOR;

// * type
type GameCardProps = {
	/** 게임 아이디 */
	id?: number;
	/** 커버 이미지 아이디*/
	cover?: string;
	/** 게임 이름 */
	name?: string;
	/** 게임 평점 */
	rating?: number;
	/** 게임 출시 년도 */
	releaseDate?: string | number;
	/** 클래스명 */
	className?: string;
	/** 스켈레톤 여부 */
	skeleton?: boolean;
}

// * component
/**
 * - `name` 값은 게임이름 항목과 커버이미지의 alt값으로 사용됩니다.
 * - `skeleton` 값으로 스켈레톤 상태를 적용시킬 수 있습니다.
 */
function GameCardComp({
	id,
	cover,
	name,
	rating,
	releaseDate,
	className,
	skeleton
}: GameCardProps) {

	const coverUrl = process.env.IGDB_COVER_URL;

	// GameCard 스켈레톤
	const GameCardSkeleton = () => {
		return (
			<>
				<ImgBox>
					<Skeleton height='100%' />
				</ImgBox>
				<GameCardText>
					<strong><Skeleton width={150} height={15} /></strong>
					<Skeleton width={50} height={15} />
				</GameCardText>
			</>
		)
	}

	return (
		<GameCard className={className}>
			{
				skeleton
					? <GameCardSkeleton />
					: <Link href={`/detail?id=${id}`}>
						<a>
							<ImgBox>
								<img
									src={`${coverUrl}${cover}.jpg`}
									alt={`${name}-cover`}
								/>
							</ImgBox>
							<GameCardText>
								<strong>{name}</strong>
								{releaseDate && <p>{releaseDate}</p>}
								{rating && <p>{rating}%</p>}
							</GameCardText>
						</a>
					</Link>
			}
		</GameCard>
	)
}
export default GameCardComp;

// * defaultProps
GameCardComp.defaultProps = {
	skeleton: false
}

// * style
// 게임 카드
const GameCard = styled.li`
	${STYLE_BOX_SHADOW};
	width:220px;
`
// 게임 커버 이미지 박스
const ImgBox = styled.div`
	width:100%;
	height:293px;
	img{
		width:100%;
		height:100%;
		display:block;
	};
`
// 게임 카드 정보 박스
const GameCardText = styled.div`
	background:${COLOR_WHITE};	
	padding:12px;
	box-sizing:border-box;
	border-top:1px solid #dadada;
	font-size:1rem;
	strong{
		display:block;
		margin-bottom:10px;
		line-height:1.2rem;
		${STYLE_ELLIPSIS}
	}
`

