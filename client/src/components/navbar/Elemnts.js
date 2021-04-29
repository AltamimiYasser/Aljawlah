import styled from 'styled-components';
import { colors } from '../../utils/styles';

export const Nav = styled.nav`
  @media (max-width: 700px) {
    flex-direction: column;
    height: auto;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  width: 100vw;
  display: flex;
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
    margin-right: 32px;
    font-weight: 600;
    text-align: center;

    @media (max-width: 700px) {
      margin: 16px auto;
    }

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
    text-align: center;

    @media (max-width: 700px) {
      font-size: 12px !important;
      margin: 16px auto;
    }
  }

  .bike {
    margin-right: auto;
    margin-left: 32px;
    color: ${(props) => (props.theme === 'light' ? '#fff' : colors.PRIMARY.bg)};
    font-size: 16px;
    @media (max-width: 700px) {
      display: none;
    }
  }

  .title {
    text-decoration: none;
    margin-right: auto;
    margin-left: 50px;
    text-align: center;
    @media (max-width: 700px) {
      font-size: 16px !important;
      margin: auto;
    }
  }

  h1 {
    color: ${(props) => (props.theme === 'light' ? '#fff' : colors.PRIMARY.bg)};
    text-align: center;
  }
`;
