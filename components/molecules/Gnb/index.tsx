import React from 'react'
import styled from 'styled-components';
import Link from 'next/link';
import { MdMoreHoriz } from 'react-icons/md';
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_WHITE } = VAR_COLOR;

// * type
type GnbCompProps = {
	className?: string;
}

// * component
export default function GnbComp({ className }: GnbCompProps) {
	return (
		<Gnb className={className}>
			<li><Link href="/discover">탐색</Link></li>
			<li>로그인</li>
			<li><MdMoreHoriz /></li>
		</Gnb>
	)
}

// * style
const Gnb = styled.ul`
	color:${COLOR_WHITE};
	display:flex;
	align-items:center;
	margin-left:auto;
	li{
		margin-right:30px;
		&:last-of-type{
			margin-right:0;
		}
		svg{
			width:20px;
			height:20px;
		}
	}
`

