import React from 'react';
import Link from 'next/link';

import styles from './PrivacyOptions.module.css';

const PrivacyOptions = () => (
  <div className={[styles['privacy-options'], 'bg-white', 'w-9/12'].join(' ')}>
    <Link href="/polityka-prywantosci"><a>Treść polityki</a></Link>
    <button type="button">Ustawienia prywatności</button>
  </div>
);

export default PrivacyOptions;
