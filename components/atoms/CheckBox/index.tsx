import styled from 'styled-components';
import React from 'react'
import { MdCheck } from 'react-icons/md';
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_PRIMARY, COLOR_WHITE, COLOR_LINE_GRAY } = VAR_COLOR;

// * type
type CheckBoxType = {
	/** 아이디 */
	id: string;
	/** 이름값 */
	name: string;
	/** 클릭 이벤트 */
	onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

// * component
function CheckBoxComp({ id, name, onClick }: CheckBoxType) {
	return (
		<>
			<CheckBox type="checkbox" id={id} name={name} onClick={onClick} />
			<label htmlFor={id}><MdCheck /></label>
		</>
	)
}
export default CheckBoxComp;

// * style
const size = '20px';

const CheckBox = styled.input`
	display:none;
	& + label{
		width: ${size};
		height: ${size};
		border:1px solid ${COLOR_LINE_GRAY};
		border-radius:5px;
		cursor:pointer;
		box-sizing:border-box;
		display:inline-flex;
		align-items:center;
		justify-content:center;
		svg{
			opacity:0;
		}
	}
	&:checked + label{
		color:${COLOR_WHITE};
		border:1px solid ${COLOR_PRIMARY};
		background: ${COLOR_PRIMARY};
		svg{
			opacity:1;
		}
	}
`
