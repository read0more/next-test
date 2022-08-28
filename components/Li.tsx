import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

export type Props = {
  index: string;
  img: string;
};

const Li: NextPage<Props> = ({ index, img }) => {
  return (
    <li>
      <figure>
        <b>{index}</b>
        <Image src={img} alt="sample img" width={300} height={300} />
        <figcaption>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&#39;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </figcaption>
      </figure>
    </li>
  );
};

export default Li;
