import React from 'react'
import styled, { css } from 'styled-components';
import { Avatar, List, Item } from 'components/atoms';
import { Skeleton } from 'components/atoms'
import { STYLE_BOX_SHADOW, STYLE_ELLIPSIS } from 'static/styles/common';
import { pxToRem } from 'static/styles/common';

// * type
type StrearmCardProps = {
	/** 스켈레톤 여부 */
	skeleton?: boolean;
	/** 스트리머 아이디 (영문)*/
	id?: string;
	/** 스트리머 이름 */
	name?: string;
	/** 방송 제목 */
	title?: string;
	/** 스트리머 프로필 이미지 */
	profileImg?: string;
	/** 방송 썸네일 이미지 */
	thumbnail?: string;
	/** 방송 시청자 수 */
	viewer?: number;
}

// * component
/**
 * - 게임별로 트위치에서 방송중인 스트리머를 보여주는 카드 컴포넌트 입니다.
 */
function StrearmCardComp({
	id,
	name,
	title,
	profileImg,
	thumbnail,
	viewer,
	skeleton
}: StrearmCardProps) {

	const thumbnailUrl = thumbnail?.replace('{width}', '369').replace('{height}', '208')
	const profileImgUrl = profileImg?.replace('300x300.png', '70x70.png')

	// StrearmCard 스켈레톤
	const StrearmCardSkeleton = () => {
		return (
			<>
				<Skeleton height={208} />
				<StreamerInfo>
					<Avatar skeleton={true} />
					<List flex={false}>
						<Item><Skeleton width={100} height={10} /></Item>
						<Item><Skeleton width={200} height={10} /></Item>
					</List>
				</StreamerInfo>
			</>
		)
	}

	return (
		<StrearmCard>
			{
				skeleton
					? <StrearmCardSkeleton />
					: <a href={`https://www.twitch.tv/${id}`} target="_blank">
						<Thumbnail>
							<LiveLabel>LIVE</LiveLabel>
							<img src={thumbnailUrl} alt={`${id}_thumbnail`} />
							<ViewerBox>시청자 {viewer.toLocaleString()}명</ViewerBox>
						</Thumbnail>
						<StreamerInfo>
							<Avatar img={profileImgUrl} />
							<List flex={false}>
								<li><strong>{name}</strong></li>
								<li><p>{title}</p></li>
							</List>
						</StreamerInfo>
					</a>
			}
		</StrearmCard>
	)
}
export default StrearmCardComp

// * style
// 방송 카드 박스
const StrearmCard = styled.li`
	${STYLE_BOX_SHADOW};
	width:369px;
`
// 방송 썸네일 박스
const Thumbnail = styled.div`
	position:relative;
	height:208px;
	& > *{
		position:absolute;
	}
	img{
		left:0;
		top:0;
		width:100%;
		height:100%;
		z-index:-1;
	}
`
// 공통 스타일
const Common = css`
	border-radius: 5px;
	color:#fff;
	left:10px;
`
// Live 표시 라벨
const LiveLabel = styled.div`
	${Common};
	padding:5px 7px;
	background:#C92A2A;
	top:10px;
	font-size:${pxToRem(11)};
	letter-spacing:${pxToRem(0.8)};
`
// 시청자 수 라벨
const ViewerBox = styled.div`
	${Common};
	//letter-spacing:0.05rem;
	background: rgba(0, 0, 0, 0.6);
	padding:5px;
	bottom:10px;
	font-size:${pxToRem(13)}; 
`
// 스트리머 정보 박스
const StreamerInfo = styled.div`
	padding: 14px 10px;
	background:#fff;
	display:flexbox;
	align-items:center;
	ul{
		width:80%;
		margin-left:10px;
		li{
			& > * {
				${STYLE_ELLIPSIS}
			}
			&:first-of-type{
				margin-bottom:8px;
			}
			strong{
				font-size:${pxToRem(15)}; 
			}
			p{
				font-size:${pxToRem(13)}; 
			}
		}
	}
`



