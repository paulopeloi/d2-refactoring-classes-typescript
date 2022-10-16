import styled, { css } from 'styled-components';

interface InputStyleProps {
	isFocused: boolean;
}

export const Container = styled.div<InputStyleProps>`
  display: flex;
  align-items: center;

  background: #fff;
	border: 0.5px solid;
	border-color: #b7b7cc;
  border-radius: 8px;
  padding: 18px 24px;
  width: 100%;
  font-size: 16px;

  & + div {
    margin-top: 24px;
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

	${(props) =>
    props.isFocused &&
		css`
			border-color: #ff9000;
		`}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;

    &::placeholder {
      color: #b7b7cc;
    }

		${(props) =>
    props.isFocused &&
		css`
		 color: #ff9000;
		`}
  }

  svg {
    margin-right: 16px;
  }
`;
