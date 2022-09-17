import type { NextPage } from 'next';
import Link from 'next/link';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import json from '@/mock_data.json';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import NextImageWrapper from '@/lib/NextImageWrapper';

SwiperCore.use([Pagination]);
SwiperCore.use([Autoplay]);

const Home: NextPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setSelectedIndex] = useState<number>(0);
  function geSlideDataIndex(swipe: SwiperCore) {
    let { activeIndex } = swipe;
    const slidesLen = swipe.slides.length;
    if (swipe.params.loop) {
      switch (swipe.activeIndex) {
        case 0:
          activeIndex = slidesLen - 3;
          break;
        case slidesLen - 1:
          activeIndex = 0;
          break;
        default:
          activeIndex -= 1;
      }
    }
    return activeIndex;
  }
  return (
    <>
      <div style={{ backgroundColor: 'white' }}>
        <Swiper
          autoHeight
          slidesPerView={1}
          tag="div"
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onInit={(_swiper) => {
            setSelectedIndex(_swiper.realIndex);
          }}
          onSlideChangeTransitionEnd={(_swiper) => {
            // setSelectedIndex(_swiper.realIndex);
          }}
          onSlideChange={(_swiper) => {
            setSelectedIndex(geSlideDataIndex(_swiper));
          }}
        >
          {json.data.map(({ index, img }) => {
            return (
              <SwiperSlide key={index}>
                {/* <img src={img} alt={''} /> */}
                {/* <NextImageWrapper
                      nextImageProps={{
                        src: 'https://picsum.photos/500/500',
                        alt: 'alt',
                        layout: 'fill',
                        // priority: true,
                      }}
                    /> */}
                <NextImageWrapper
                  nextImageProps={{
                    src: img,
                    alt: 'alt',
                    layout: 'fill',
                    // priority: true,
                  }}
                />
              </SwiperSlide>
            );
          })}
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
