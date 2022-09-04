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
  span: ${(props) => props.divStyles};
  img: ${(props) => props.imgStyles};
`;

const defaultDivStyles: CSSProperties = {
  display: 'block',
  position: 'static',
};

const defaultImgStyles: CSSProperties = {
  display: 'block',
  position: 'static',
  width: '100%',
  height: 'auto',
};

// next/image에 지정된 기본 스타일은 인라인으로 들어가므로 next/image의 스타일으로 덮어씌워지는 것을 막기 위해 !important추가
function importantize(styles: CSSProperties): CSSProperties {
  const keys = Object.keys(styles) as (keyof CSSProperties)[];
  const result: { [key: string]: string } = {};

  keys.forEach((style) => {
    result[style] = `${styles[style]} !important;`;
  });

  return result;
}

function CSSPropertiesToTextForJSX(styles: CSSProperties): string {
  const keys = Object.keys(styles) as (keyof CSSProperties)[];
  return keys.map((style) => `${style}: ${styles[style]}`).join('');
}

const NextImageWrapper: React.FC<Props> = ({
  nextImageProps,
  divStyles = {},
  imgStyles = {},
  styleReset = false,
}: Props) => {
  const resultDivStyles: CSSProperties = styleReset
    ? {
        overflow: 'revert',
        position: 'revert',
        inset: 'revert',
        margin: 'revert',
        ...divStyles,
      }
    : { ...defaultDivStyles, ...divStyles };
  const resultImgStyles: CSSProperties = styleReset
    ? {
        position: 'revert',
        inset: 'revert',
        padding: 'revert',
        border: 'revert',
        margin: 'revert',
        display: 'revert',
        width: 'revert',
        height: 'revert',
        minWidth: 'revert',
        maxWidth: 'revert',
        minHeight: 'revert',
        maxHeight: 'revert',
        ...imgStyles,
      }
    : { ...defaultImgStyles, ...imgStyles };

  return (
    <>
      <Wrapper
        divStyles={CSSPropertiesToTextForJSX(importantize(resultDivStyles))}
        imgStyles={CSSPropertiesToTextForJSX(importantize(resultImgStyles))}
      >
        <Image {...nextImageProps} />
      </Wrapper>
    </>
  );
};

export default NextImageWrapper;
