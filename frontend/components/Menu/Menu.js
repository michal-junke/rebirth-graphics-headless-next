/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Config from '../../config';

import styles from './Menu.module.scss';
import GlideSlider from '../GlideSlider/GlideSlider';
import Hamburger from './hamburger.svg';
import Cross from './cross.svg';

const getSlug = url => {
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
};

class Menu extends Component {
  state = {
    token: null,
    username: null,
    desktopMenuActive: false,
  };

  componentDidMount() {
    const token = localStorage.getItem(Config.AUTH_TOKEN);
    const username = localStorage.getItem(Config.USERNAME);
    this.setState({ token, username });
  }

  desktopMenuToggle = () => {
    this.setState((prevState) => ({
      desktopMenuActive: !prevState.desktopMenuActive,
    }));
  }

  render() {
    const { menu, isFixed } = this.props;
    const { desktopMenuActive } = this.state;

    const desktopMenu = (
      <div className={[styles.desktopMenu, 'hidden', 'md:block', 'md:fixed', 'h-full', 'inset-y-0', 'right-0', 'w-5/12', 'z-20'].join(' ')}>
        <ul className="pt-10">
          <li className="text-right pb-20">
            <button type="button" className="inline px-4 lg:px-10" aria-label="Zamknij menu" onClick={this.desktopMenuToggle}><Cross className="w-6 h-6 lg:w-10 lg:h-10 z-40 text-white" /></button>
          </li>
          {menu.items.map(item => {
            const blank = item.blank ? ['_blank', 'noopener'] : '';
            if (item.object === 'custom') {
              return (
                <a href={item.url} target={blank[0]} rel={blank[1]} key={item.ID}>
                  <p className="text-center text-4xl uppercase mx-auto mt-2 block text-white hover:text-gray-400">
                    <span className="font-bold">{item.punctuation}</span>
                    {item.title}
                  </p>
                </a>
              );
            }
            const slug = getSlug(item.url);
            const actualPage = item.object === 'category' ? 'category' : 'post';
            return (
              <Link
                as={`/${slug}`}
                href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                key={item.ID}
              >
                <a target={blank[0]} rel={blank[1]}>
                  <div className="menu-button">
                    <p className="text-center uppercase mx-auto mt-2 block text-white text-4xl hover:text-gray-400">
                      <span className="font-bold">{item.punctuation}</span>
                      {item.title}
                    </p>
                  </div>
                </a>
              </Link>
            );
          })}
        </ul>
      </div>
    );

    return (
      <div className={`${isFixed ? `${styles.isFixed} md:pt-8 md:fixed md:top-0 mb-10 md:mb-0` : 'md:absolute md:pt-10 pb-2'} md:w-full menu md:flex md:justify-between z-10 md:px-4 lg:px-10 md:pb-0 ${this.props.padding ? 'mx-3 md:mx-6' : ''}`}>
        <div className="brand md:w-4/12">
          <Link href="/">
            <a className="starter-kit-logo">
              <picture>
                <source srcSet={isFixed ? '/images/logo-desktop-black.svg' : '/images/logo-desktop.svg'} media="(min-width:768px)" />
                <img src="/images/logo.svg" className={`${isFixed ? 'w-6/12 pb-3' : 'w-8/12'} mx-auto lg:mx-0`} style={{ maxWidth: 275 }} alt="" />
              </picture>
            </a>
          </Link>
        </div>
        <div className="hidden md:flex items-start">
          <span className="text-3xl lg:text-5xl text-white mr-6 lg:mr-20 uppercase leading-none">:Tytuł strony</span>
          <button type="button" className="pt-1" aria-label="Otwórz menu" onClick={this.desktopMenuToggle}><Hamburger className={`w-6 h-6 lg:w-10 lg:h-10 z-40 ${desktopMenuActive ? 'invisible' : ''}`} /></button>
        </div>
        {desktopMenuActive ? desktopMenu : ''}

        <div className="md:absolute lg:inset-y-0 md:invisible main-nav">

          <div className="lg:grid grid-cols-5 w-full mt-3 lg:grid-cols-1">
            <GlideSlider
              instance="menu"
              mobile
              options={{
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
                    peek: { before: 40, after: 40 },
                  },
                },
              }}
            >
              {menu.items.map(item => {
                const blank = item.blank ? ['_blank', 'noopener'] : '';
                if (item.object === 'custom') {
                  return (

                    <a href={item.url} key={item.ID} target={blank[0]} rel={blank[1]}>
                      <img src={item.cat_icon} alt="" className={['rounded-full', 'mx-auto', 'block', 'lg:hidden', styles['menu-circle']].join(' ')} />
                      <p className="text-center text-xs uppercase mx-auto mt-2 lg:text-xl block leading-tight">
                        <span className="mr-1">{item.punctuation}</span>
                        {item.title}
                      </p>
                    </a>
                  );
                }
                const slug = getSlug(item.url);
                const actualPage = item.object === 'category' ? 'category' : 'post';
                return (
                  <Link
                    as={`/${slug}`}
                    href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                    key={item.ID}
                  >

                    <a target={blank[0]} rel={blank[1]}>
                      <div className="menu-button">
                        <img src={item.cat_icon} alt="" className={['rounded-full', 'mx-auto', 'block', 'lg:hidden', styles['menu-circle']].join(' ')} />
                        <p className="text-center text-xs uppercase mx-auto mt-2 lg:text-xl block break-words leading-tight">
                          <span className="mr-1 font-bold">{item.punctuation}</span>
                          {item.title}
                        </p>
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
