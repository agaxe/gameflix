import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import LogoImg from 'static/images/logo.svg';

// * type
type LogoProps = {
	/** 링크의 유무 */
	link: boolean
}

// * component
function LogoComp({ link }: LogoProps) {

	const [ImgFile, setImgFile] = useState('');

	useEffect(() => {
		setImgFile(LogoImg);
	}, [])

	// 로고
	function Logo() {
		return (
			<img
				src={ImgFile}
				alt="logo"
				css={{ 'background': 'none' }}
			/>
		)
	}

	return (
		<div>
			{
				link
					? <Link href="/"><a><Logo /></a></Link>
					: <Logo />
			}
		</div>
	)
}
export default LogoComp

// * defaultProps
LogoComp.defaultProps = {
	link: true
};



