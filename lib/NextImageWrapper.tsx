import React, { CSSProperties } from 'react';
import Image, { ImageProps } from 'next/image';
import styled from 'styled-components';

type Props = {
  nextImageProps: ImageProps;
  divStyles?: CSSProperties;
  imgStyles?: CSSProperties;
  styleReset?: boolean;
};

type StyledProps = {
  divStyles: string;
  imgStyles: string;
};

const Wrapper = styled.div<StyledProps>`
  width: 100%;
  & > span {
    position: unset !important;
    & img {
      object-fit: contain !important;
      position: relative !important;
      height: auto !important;
    }
  }
`;

const NextImageWrapper: React.FC<Props> = ({ nextImageProps }: Props) => {
  return (
    <Wrapper className="swiper-lazy">
      <Image {...nextImageProps} />
    </Wrapper>
  );
};

export default NextImageWrapper;
