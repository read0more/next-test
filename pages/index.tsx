import type { NextPage } from 'next';
import Link from 'next/link';
import SwiperCore, { Autoplay, Lazy, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import json from '@/mock_data.json';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import NextImageWrapper from '@/lib/NextImageWrapper';

SwiperCore.use([Pagination]);
SwiperCore.use([Autoplay]);

type imageProps = {
  src: string;
  srcset: string;
};

const Home: NextPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [optimizedImages, setOptimizedImages] = useState<imageProps[]>();
  const optimizedImagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!optimizedImagesRef?.current) return;

    const images = optimizedImagesRef.current.querySelectorAll('img');
    setOptimizedImages(
      Array.from(images).map((image) => {
        return {
          src: image.src,
          srcset: image.srcset,
        };
      })
    );
  }, [optimizedImagesRef.current]);

  return (
    <>
      <div style={{ backgroundColor: 'white' }} className="swiper-container">
        <Swiper
          modules={[Lazy]}
          autoHeight
          tag="div"
          loop
          lazy={{ loadPrevNextAmount: 3, loadPrevNext: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          observer={true}
          observeParents={true}
        >
          {json.data.map(({ index, img }) => (
            <SwiperSlide key={index}>
              {/* <img src={src} srcSet={srcset} className="swiper-lazy" /> */}
              <NextImageWrapper
                key={index}
                nextImageProps={{
                  src: img,
                  layout: 'fill',
                  priority: index === '1',
                }}
              />
              {/* <div
                style={{ display: '0' }}
                ref={optimizedImagesRef}
                className="swiper-lazy"
              >
                <Image src={img} layout="fill" key={index} />;
              </div> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link href="/product">
        <a
          style={{
            display: 'block',
            width: '500px',
            height: '500px',
            background: 'brown',
          }}
        >
          Go To Product List
        </a>
      </Link>
    </>
  );
};

export default Home;
