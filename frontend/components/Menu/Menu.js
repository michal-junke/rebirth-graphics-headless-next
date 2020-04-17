/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Config from '../../config';
import Logo from '../../public/images/logo.svg';
import SearchIcon from '../../public/images/search.svg';

import styles from './Menu.module.css';

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
                <Logo className="w-9/12 mx-auto lg:mx-0" height="auto"/>
              </a>
            </Link>
        </div>

        <div className="hidden lg:block">Tu będzie hamburger</div>
        
        <div className="lg:absolute lg:inset-y-0 lg:invisible main-nav">
          
          <div className="grid grid-cols-5 w-full mt-3 lg:grid-cols-1">
            {menu.items.map(item => {
              if (item.object === 'custom') {
                return (
                  
                  <a href={item.url} key={item.ID}>
                  <img src="https://via.placeholder.com/150?Text=Ikona" alt="" className="rounded-full w-10/12 mx-auto block lg:hidden menu-circle"/>
                  <p className="text-center text-xs uppercase w-9/12 mx-auto mt-2 lg:text-xl"><span className="mr-1">I</span>{item.title}</p>
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
                      <img src="https://via.placeholder.com/150?Text=Ikona" alt="" className="rounded-full w-10/12 mx-auto block lg:hidden menu-circle" />
                      <p className="text-center text-xs uppercase w-9/12 mx-auto mt-2 lg:text-xl"><span className="mr-1">I</span>{item.title}</p>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
