import React from 'react'
import styled, { css } from 'styled-components';
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
				: <AvatarBox><Avatar img={img} /></AvatarBox>
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
const commonStyles = css`
	border-radius:50%;
	width:45px;
	height:45px;
`
const AvatarBox = styled.div`
	${commonStyles}
	border:1px solid ${COLOR_GRAY};
	background:${COLOR_GRAY};
`
const Avatar = styled.div<AvatarProps>`
	${commonStyles}
	background:url(${props => props.img}) center center no-repeat;
	background-size:cover;
`





