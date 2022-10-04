import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './product.module.scss';

const Product: NextPage<{ img: string; id: string }> = () => {
  return (
    <div>
      <Image
        src="https://picsum.photos/1006/500"
        alt="image"
        width={1000}
        height={500}
      ></Image>
      <Link href={`/product`}>
        <div className={styles.box}>
          <em>아무개아무개</em>
          <b className={styles.text}>리스트로</b>
        </div>
      </Link>
    </div>
  );
};

export default Product;
