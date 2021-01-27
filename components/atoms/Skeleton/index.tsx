import React from 'react'
import styled from "styled-components";
import Skeleton from '@material-ui/lab/Skeleton';

// * type
type SkeletonProps = {
	width?: number | string;
	height?: number | string;
	variant?: 'text' | 'rect' | 'circle';
}

// * component 
/**
 * - <a href="https://material-ui.com/components/skeleton/" target="_blank">material ui 의 skeleton</a> 을 사용하였습니다.  
 */
function SkeletonComp({ width, height, variant }: SkeletonProps) {
	return (
		<SkeletonBox variant={variant} width={width} height={height} />
	)
}
export default SkeletonComp

// * defaultProps 
SkeletonComp.defaultProps = {
	variant: 'text'
}

// * style
const SkeletonBox = styled(Skeleton)`
	transform:scale(1) !important;
`

