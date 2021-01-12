import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import { FaPlaystation, FaGamepad, FaSteam, FaTwitch } from "react-icons/fa";
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_PRIMARY } = VAR_COLOR;

// * type
type LoadingModalProps = {
	className?: string;
}

// * component
/**
 * - 페이지 이동 시 보여주는 로딩 모달 입니다.
 * - 사용된 아이콘은 게임 사이트에 어울리도록 게임과 관련된 아이콘을 사용하였습니다.
 */
function LoadingModalComp({ className }: LoadingModalProps) {

	const [Index, setIndex] = useState(0);

	// 아이콘 
	useEffect(() => {
		let cnt = 0;
		let IconTimer = setInterval(() => {
			cnt = ++cnt;
			cnt === 4 ? cnt = 0 : null;
			setIndex(cnt);
		}, 300);
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
			clearInterval(IconTimer)
		}
	}, [])

	return (
		<LoadingModal className={className}>
			<div>
				{Index === 0 && <p><FaPlaystation /></p>}
				{Index === 1 && <p><FaGamepad /></p>}
				{Index === 2 && <p><FaSteam /></p>}
				{Index === 3 && <p><FaTwitch /></p>}
			</div>
		</LoadingModal>
	)
}
export default LoadingModalComp

// * style
const LoadingModal = styled.div`
	position:fixed;
	left:0;
	top:0;
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.8);
	color:#fff;
	z-index:1000;
	display:flex;
	align-items:center;
	justify-content:center;
	color:${COLOR_PRIMARY};
	p{
		font-size:50px;
	};
`