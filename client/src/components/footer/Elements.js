import styled from 'styled-components';
import { StyledIconBase } from '@styled-icons/styled-icon';

export const StyledFooter = styled.footer`
  ${StyledIconBase} {
    height: 36px;
    width: 36px;
    color: rgba(150, 150, 150, 1);
    margin-right: 16px;
  }
  height: 250px;
  background: rgba(34, 34, 34, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px 0;

  .icons,
  .links {
    display: flex;
    margin: 16px;
  }
  .link {
    color: rgba(150, 150, 150, 1);
    text-decoration: none;
    margin-right: 16px;
  }
  .rights {
    color: rgba(150, 150, 150, 1);
    text-decoration: none;

    .rights-icon {
      margin-right: 8px;
      height: 18px;
      width: 18px;
      vertical-align: text-top;

      /* to align with the text */
      margin-top: 1px;
    }

    .rights-link {
      color: #fff;
      margin: 0 4px;
    }
  }

  .twitter {
    background: #4d9feb;
    border-radius: 50%;
    border: none;
    color: #fff;
    transition: all 0.2s ease;
    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  .youtube {
    background: #ea3323;
    border-radius: 50%;
    border: none;
    color: #fff;
    transition: all 0.2s ease;
    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  .facebook {
    background: #3975ea;
    border-radius: 50%;
    border: none;
    color: #fff;
    transition: all 0.2s ease;
    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }
`;
