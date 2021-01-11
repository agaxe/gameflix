import React from 'react'
import styled from 'styled-components';
import { Skeleton } from 'components/atoms'
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_GRAY } = VAR_COLOR;

// * type
type AvatarProps = {
	/** avatar 스켈레톤 */
	skeleton?: boolean;
	/** avatar 이미지 */
	img?: string;
}

// * component
/**
* - `img` 값으로 이미지를 적용시킵니다.
 */
function AvatarComp({ skeleton, img }: AvatarProps) {
	return (
		<>
			{skeleton
				? <Skeleton variant="circle" width={45} height={45} />
				: <Avatar img={img} />
			}
		</>
	)
}
export default AvatarComp

// * defaultProps 
AvatarComp.defaultProps = {
	skeleton: false
}

// * style
const Avatar = styled.div<AvatarProps>`
	border-radius:50%;
	width:45px;
	height:45px;
	background:url(${props => props.img}) center center no-repeat;
	background-size:cover;
	border:1px solid ${COLOR_GRAY}
`





