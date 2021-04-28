import styled from 'styled-components';
import { colors } from '../../utils/styles';

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  gap: 10px;
  text-decoration: none;
  height: 80px;
  background: ${(props) =>
    props.theme === 'light' ? colors.PRIMARY.bg : '#fff'};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .link {
    color: ${(props) => (props.theme === 'light' ? '#fff' : colors.PRIMARY.bg)};
    text-decoration: none;
    margin-right: 16px;
    &:hover {
      color: ${(props) =>
        props.theme === 'light' ? '#d4c6c6' : colors.PRIMARY.hover};
    }
  }

  .btn {
    color: white;
    background: none;
    border: none;
    font-size: 16px;
    margin-right: 16px;
    cursor: pointer;
  }

  .bike {
    margin-right: auto;
    margin-left: 16px;
    color: ${(props) => (props.theme === 'light' ? '#fff' : colors.PRIMARY.bg)};
    font-size: 16px;
  }

  h1 {
    margin-right: auto;
    margin-left: 50px;
    color: ${(props) => (props.theme === 'light' ? '#fff' : colors.PRIMARY.bg)};
    text-align: center;
  }
`;
