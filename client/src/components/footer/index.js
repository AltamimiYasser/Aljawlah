import React from 'react';
import { Link } from 'react-router-dom';
import { TwitterWithCircle } from '@styled-icons/entypo-social';
import { Copyright } from '@styled-icons/boxicons-regular/Copyright';
import { YoutubeWithCircle } from '@styled-icons/entypo-social/YoutubeWithCircle';
import { Facebook } from '@styled-icons/bootstrap/Facebook';
import { StyledFooter } from './Elements';

const Footer = () => {
  return (
    <StyledFooter>
      <div className='icons'>
        <a href='https://twitter.com'>
          <TwitterWithCircle className='twitter' />
        </a>
        <a href='https://www.youtube.com'>
          <YoutubeWithCircle className='youtube' />
        </a>
        <a href='https://facebook.com'>
          <Facebook className='facebook' />
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
          <Copyright className='rights-icon' />
          <span>2020</span>{' '}
          <Link to='/' className='rights-link'>
            Aljawlah.
          </Link>
          <span>All Rights Reserved</span>
        </p>
      </div>
    </StyledFooter>
  );
};

export default Footer;
