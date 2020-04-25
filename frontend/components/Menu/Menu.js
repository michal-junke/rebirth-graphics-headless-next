/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Config from '../../config';
import Logo from '../../public/images/logo.svg';
const logoDesktop = require('../../public/images/logo-desktop.svg');
import SearchIcon from '../../public/images/search.svg';

import styles from './Menu.module.css';
import GlideSlider from '../GlideSlider/GlideSlider';

const getSlug = url => {
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
};

class Menu extends Component {
  state = {
    token: null,
    username: null,
  };

  componentDidMount() {
    const token = localStorage.getItem(Config.AUTH_TOKEN);
    const username = localStorage.getItem(Config.USERNAME);
    this.setState({ token, username });
  }

  render() {
    const { menu } = this.props;
    const { token, username } = this.state;

    const handleSelectChange = (e) => {
      location.href = e.target.value;
    }

    return (
      <div className={`menu lg:flex lg:justify-between ${this.props.padding ? 'mx-3 md:mx-6' : ''}`}>
        <div className="brand lg:w-3/12">
            <Link href="/">
              <a className="starter-kit-logo">
                <picture>
                  <source srcset="/images/logo-desktop.svg" media="(min-width:768px)"/>
                  <img src="/images/logo.svg" className="w-8/12 mx-auto lg:mx-0" style={{maxWidth: 335}}/>
                </picture>
              </a>
            </Link>
        </div>

        <div className="hidden lg:block">Tu będzie hamburger</div>
        
        <div className="lg:absolute lg:inset-y-0 lg:invisible main-nav">
          
            <GlideSlider instance="menu" mobile options={{
  type: 'slider',
  focusAt: 0,
  bound: true,
  perView: 5,
  rewind: false,
  peek: { before: 10, after: 10 },
  gap: 10,
  breakpoints: {
    375: {
      perView: 4,
      peek: { before: 40, after: 40}
    }
  }
}}>
            {menu.items.map(item => {
              if (item.object === 'custom') {
                return (
                  
                  <a href={item.url} key={item.ID}>
                    <img src={item.cat_icon} alt="" className={['rounded-full', 'mx-auto', 'block', 'lg:hidden', styles['menu-circle']].join(' ')}/>
                    <p className="text-center text-xs uppercase mx-auto mt-2 lg:text-xl block leading-tight"><span className="mr-1">{item.punctuation}</span>{item.title}</p>
                  </a>
                );
              }
              const slug = getSlug(item.url);
              const actualPage = item.object === 'category' ? 'category' : 'post';
              return (
                <Link
                  as={`/${item.object}/${slug}`}
                  href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                  key={item.ID}
                >
                  
                  <a>
                    <div className="menu-button">
                      <img src={item.cat_icon} alt="" className={['rounded-full', 'mx-auto', 'block', 'lg:hidden', styles['menu-circle']].join(' ')} />
                      <p className="text-center text-xs uppercase mx-auto mt-2 lg:text-xl block break-words leading-tight"><span className="mr-1 font-bold">{item.punctuation}</span>{item.title}</p>
                    </div>
                  </a>
                </Link>
              );
            })}
            </GlideSlider>
            
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
