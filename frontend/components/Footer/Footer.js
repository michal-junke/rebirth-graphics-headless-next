import React, { Component } from 'react';
import Link from 'next/link';

import styles from './Footer.module.css';
import MjLogo from './mj-logo.svg';

const Footer = (props) => {
  const {acfOptions} = props; 
  return (
    <>
    <div className="lg:flex lg:justify-between lg:items-center">
      <section className="social flex flex-col container grid-padding lg:order-1">
        <p className={[styles.tilted, 'lg:hidden'].join(' ')}>... passion for creation ...</p>
        <div className="social-icons flex justify-end pt-2 pb-4 lg:py-0">
          <a href={acfOptions.behance_url}><i className="rg-behance px-3 text-4xl"><span className="path1"></span><span className="path2"></span></i></a>
          <a href={acfOptions.facebook_url}><i className="rg-facebook px-3 text-4xl"><span className="path1"></span><span className="path2"></span></i></a>
          <a href={acfOptions.instagram_url}><i className="rg-instagram px-3 text-4xl"><span className="path1"></span><span className="path2"></span></i></a>
        </div>
      </section>
      <section className="about-me-menu grid-padding lg:order-0 lg:w-full lg:items-center">
        <ul className="flex justify-between uppercase flex-wrap text-sm lg:text-base">
        <li><Link href="/o-mnie"><a>O mnie</a></Link></li>
        <li><Link href="/kontakt"><a>Kontakt</a></Link></li>
        <li><Link href="/wspolpraca"><a>Współpraca</a></Link></li>
        <li><Link href="/polityka-prywatnosci"><a>Polityka prywatności</a></Link></li>
        </ul>
      </section>
    </div>
    <hr className="border-t grid-margin my-3 border-black"/>
    <p className={[styles['bottom-quote'], 'text-center', 'text-2xl'].join(' ')}>zadbaj o relację ze swoją pasją...</p>
    <section className="newsletter text-center pt-3 primary font-bold text-xl">
      <a href="#subscribe" className="uppercase">Subskrybuj</a>
    </section>
    <div className="footer grid-padding text-center py-4">
      <p className="pb-3">© Rebirth of passion - <span className="uppercase">blog o relacji z pasją | twórczym życiu | projektowaniu | mindfulness</span></p>
      <div className="flex items-center justify-center">
        <p>Wykonane z <span title="pasją" className="cursor-default">❤</span> przez </p><a href="https://michaljunke.com" className="inline-block w-5 ml-2"  title="Michała Junkego"><MjLogo/></a>
      </div>
    </div>
    </>
    )
  }

export default Footer;
