import styled, { css } from 'styled-components';
import { colors } from '../../utils/styles';

const buttonDisabled = css`
  background-color: #626262;
  &:hover {
    background-color: #626262;
    cursor: default;
  }
`;

export const StyledButton = styled.button`
  width: 80%;
  margin: 20px;
  padding: 16px 10px;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 4px;
  border: ${(props) => (props.color ? 'none' : `.5px solid ${colors.PRIMARY}`)};
  background-color: ${(props) => (props.color ? props.color.bg : '#fff')};
  color: ${(props) => (props.color ? '#fff' : '#323232')};
  box-shadow: ${(props) =>
    props.color
      ? `1px 1px 1px ${props.color}`
      : `1px 1px 1px ${colors.PRIMARY}`};
  justify-self: end;
  &:hover {
    background-color: ${(props) => (props.color ? props.color.hover : '#fff')};
    cursor: pointer;
  }

  ${(props) => props.disabled && buttonDisabled}
`;
