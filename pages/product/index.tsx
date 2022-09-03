import axios from 'axios';
import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import Li from '../../components/Li';
import { DEFAULT_LIMIT } from '../api/hello';
import Link from 'next/link';
import useSWRInfinite from 'swr/infinite';
import HelloInterface from '../api/HelloInterface';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProductList: NextPage = () => {
  const root = useRef(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const { data, size, setSize } = useSWRInfinite<{
    data: HelloInterface[];
  }>((pageIndex, previousPageData) => {
    if (previousPageData?.data && !previousPageData.data.length) return null;

    if (pageIndex === 0) return `api/hello?&limit=${DEFAULT_LIMIT}`;

    return `api/hello?offset=${
      pageIndex * DEFAULT_LIMIT
    }&limit=${DEFAULT_LIMIT}`;
  }, fetcher);

  useEffect(() => {
    if (!target) return;
    const y = sessionStorage.getItem('s');

    if (y) {
      sessionStorage.removeItem('s');
      console.log(y);
      // window.scrollTo(0, +y);
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      setSize(size + 1);
    }, options);
    observer.observe(target);
  }, [size, setSize, target]);

  return (
    <ul ref={root}>
      {data &&
        data.map(({ data: dataElement }) =>
          dataElement.map((li) => (
            <div key={li.index}>
              <Li index={li.index} img={li.img} />
              <Link href={`/product/${li.index}`}>
                <a
                  style={{
                    background: 'brown',
                    width: '500px',
                    height: '100px',
                    display: 'block',
                  }}
                >
                  Go To {li.index}
                </a>
              </Link>
            </div>
          ))
        )}
      <div ref={setTarget}></div>
    </ul>
  );
};

export default ProductList;
