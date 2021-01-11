import React from 'react'
import styled from 'styled-components';
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_GRAY } = VAR_COLOR;

// * type
type InputProps = {
	type: string;
	name: string;
	value?: string;
	placeholder?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

// * component
function InputComp({
	type,
	name,
	value,
	placeholder,
	onChange,
	className,
	onKeyPress
}: InputProps) {

	return (
		<Input
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			className={className}
			autoComplete="off"
			onKeyPress={onKeyPress}
			spellCheck="false"
		/>
	)
}
export default InputComp

// * defaultProps
InputComp.defaultProps = {
	type: 'text',
}

// * style
const Input = styled.input`
	background: ${COLOR_GRAY};
	color: #595959;
	border:0;
	border-radius:5px;
	box-sizing:border-box;
	padding:10px 15px;
	outline:none;
	&::placeholder{
		color:#9B9B9B
	}
`



