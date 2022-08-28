import axios from 'axios';
import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import Li, { Props } from '../../components/Li';
import { DEFAULT_LIMIT } from '../api/hello';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWRInfinite from 'swr/infinite';
import HelloInterface from '../api/HelloInterface';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProductList: NextPage = () => {
  const [lis, setLis] = useState<Props[]>([]);
  const root = useRef(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const router = useRouter();

  const handleRouteChange = () => {
    sessionStorage.setItem('s', `${window.scrollY}`);
  };

  const { data, size, setSize } = useSWRInfinite<{ data: HelloInterface[] }>(
    (offset) => `api/hello?offset=${offset}&limit=${DEFAULT_LIMIT}`,
    fetcher
  );

  console.log(data);

  useEffect(() => {
    if (!data) return;
    console.log(data[0]);
    setLis([...lis, ...data[0].data]);
    // offset.current += limit.current;
  }, [data]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.asPath, router.events]);

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
      setTimeout(() => setSize(size + 1), 1000);
      observer.disconnect();
      console.log('end.');
    }, options);
    observer.observe(target);
  }, [lis, target]);

  return (
    <ul ref={root}>
      {lis.map((li) => (
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
      ))}
      <div ref={setTarget}></div>
    </ul>
  );
};

export default ProductList;
