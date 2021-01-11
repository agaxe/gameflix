import styled from "styled-components";
import React from 'react'
import { useEffect, useState } from 'react'
import { List } from 'components/atoms';
import { StreamCard } from 'components/molecules';
import { Skeleton } from 'components/atoms'
import { VAR_SIZE } from 'static/styles/variable';
const { CONTENT_WIDTH } = VAR_SIZE;

// * type
type StreamListProps = {
	/** 게임 & 스트리머 데이터 */
	data: any[]
}

// * component
/**
 * - [molecules/StreamCard](/docs/component-molecules-streamcard--stream-card) 를 사용한 방송 리스트 입니다. 
 */
function StreamList({ data }: StreamListProps) {

	const [LiveList, setLiveList] = useState([])

	useEffect(() => {
		data && setLiveList(data);
	}, [data])

	return (
		<>
			{
				LiveList.length
					? LiveList.map((game, idx) => (
						<React.Fragment key={idx}>
							<LiveListBox>
								<GameTitle>{game.game}</GameTitle>
								<List
									justify="space-between"
								>
									{game.streamers.map((item, index) => {
										const thumbnail_url = item.thumbnail_url.replace('{width}', '369').replace('{height}', '208')
										const profile_image_url = item.profile_image_url.replace('300x300.png', '70x70.png')

										return (
											<React.Fragment key={index}>
												<StreamCard
													id={item.login}
													name={item.display_name}
													title={item.title}
													profileImg={profile_image_url}
													thumbnail={thumbnail_url}
													viewer={item.viewer_count}
												/>
											</React.Fragment>
										)
									})}
								</List>
							</LiveListBox>
						</React.Fragment>
					))
					:
					<>
						{[...Array(3)].map((item, idx) => (
							<LiveListBox key={idx}>
								<GameTitle><Skeleton width={150} height={15} /></GameTitle>
								<List justify="space-between">
									{[...Array(3)].map((item, index) => (
										<StreamCard key={index} skeleton={true} />
									))}
								</List>
							</LiveListBox>
						))}
					</>
			}
		</>
	)
}
export default StreamList

// * style
const LiveListBox = styled.div`
	margin-bottom:40px;
	width:${CONTENT_WIDTH}; 
`
const GameTitle = styled.p`
	font-size:1.25rem;
	margin-bottom:20px;
`
