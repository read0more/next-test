import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Product: NextPage<{ img: string; id: string }> = () => {
  return (
    <div>
      <Image
        src="https://picsum.photos/1006/500"
        alt="image"
        width={1000}
        height={500}
      ></Image>
      <Link href={`/product`}>리스트로</Link>
    </div>
  );
};

export default Product;
