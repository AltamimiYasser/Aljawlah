import React from 'react';
import { Link } from 'react-router-dom';
import { MdCopyright } from 'react-icons/md';
import styled from 'styled-components';
import { StyledIconBase } from '@styled-icons/styled-icon';
import { TwitterWithCircle } from '@styled-icons/entypo-social';
import { YoutubeWithCircle } from '@styled-icons/entypo-social/YoutubeWithCircle';
import { Facebook } from '@styled-icons/bootstrap/Facebook';

const StyledFooter = styled.footer`
  ${StyledIconBase} {
    height: 36px;
    width: 36px;
    color: rgba(150, 150, 150, 1);
  }
  height: 250px;
  background: rgba(34, 34, 34, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  .icons,
  .links {
    display: flex;
    gap: 16px;
  }
  .link {
    color: rgba(150, 150, 150, 1);
    text-decoration: none;
  }
  .rights {
    color: rgba(150, 150, 150, 1);
    text-decoration: none;

    .rights-icon {
      margin-right: 8px;
    }

    .rights-link {
      color: #fff;
      margin-right: 8px;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className='icons'>
        <a href='https://twitter.com'>
          <TwitterWithCircle />
        </a>
        <a href='https://www.youtube.com'>
          <YoutubeWithCircle />
        </a>
        <a href='https://facebook.com'>
          <Facebook />
        </a>
      </div>
      <div className='links'>
        <Link to='/' className='link'>
          About
        </Link>
        <Link to='/' className='link'>
          Contact
        </Link>
        <Link to='/' className='link'>
          Phone
        </Link>
        <Link to='/' className='link'>
          Branches
        </Link>
        <Link to='/' className='link'>
          Location
        </Link>
      </div>
      <div className='rights'>
        <p>
          <MdCopyright className='rights-icon' />
          <span>2020</span>{' '}
          <Link to='/' className='rights-link'>
            Aljawlah
          </Link>
          <span>All Rights Reserved</span>
        </p>
      </div>
    </StyledFooter>
  );
};

export default Footer;
