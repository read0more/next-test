import FirstDesktop from '@/components/FirstDesktop';
import FirstMobile from '@/components/FirstMobile';
import SecondDesktop from '@/components/SecondDesktop';
import SecondMobile from '@/components/SecondMobile';
import type { NextPage } from 'next';
import React from 'react';

type Props = {
  isMobile: boolean;
  ver: number;
  id: 'first' | 'second';
};

const Intro: NextPage<Props> = ({ isMobile, ver, id }) => {
  let TargetComponent: JSX.Element;
  if (id === 'first') {
    TargetComponent = isMobile ? <FirstMobile /> : <FirstDesktop />;
  } else if (id === 'second') {
    TargetComponent = isMobile ? <SecondMobile /> : <SecondDesktop />;
  } else {
    // go to 404 page
    TargetComponent = <></>;
  }

  return TargetComponent;
};

export async function getStaticProps() {
  const isMobile = true;
  const ver = Date.now();
  const id = 'second';

  return {
    props: {
      isMobile,
      ver,
      id,
    },
  };
}

export default Intro;
