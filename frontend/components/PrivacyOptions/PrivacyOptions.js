/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

import styles from './PrivacyOptions.module.css';

const PrivacyOptions = (props) => {
  const { close } = props;
  return (
    <div className={styles['privacy-options']}>
      <div className={styles['privacy-options__popup']}>
        <button className={styles['privacy-options__close']} type="button" onClick={close}>X</button>
        <h2 className={styles.popup__title}>Polityka prywatności</h2>
        <hr />
        <Link href="/post?slug=polityka-prywatnosci&apiRoute=page" as="polityka-prywatnosci">
          <a
            onClick={close}
            onKeyDown={close}
            className="uppercase text-xl pt-3"
          >
            Treść polityki prywatności
          </a>
        </Link>
        <button type="button" className="uppercase text-xl pb-3 mt-2">Ustawienia prywatności</button>
      </div>
    </div>
  );
};

export default PrivacyOptions;
