import React, { MouseEvent, useRef } from 'react';
import styles from './index.module.css';
import Card from './Card';
import { NextPage } from 'next';

const CARD_COUNT = 20;
const MOUSE_EVENTS = ['mouseenter', 'mouseup', 'mousedown', 'mousemove'];

const Index: NextPage = () => {
  const pressed = useRef(false);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerSliderRef = useRef<HTMLDivElement>(null);

  const checkBoundary = () => {
    if (!containerRef.current) return;
    if (!innerSliderRef.current) return;

    const outer = containerRef.current.getBoundingClientRect();
    const inner = innerSliderRef.current.getBoundingClientRect();

    if (parseInt(innerSliderRef.current.style.left) > 0) {
      innerSliderRef.current.style.left = '0px';
    }

    console.log(inner.right, outer.right);
    if (inner.right < outer.right) {
      innerSliderRef.current.style.left = `-${inner.width - outer.width}px`;
    }
  };

  const handleMouse = (event: MouseEvent) => {
    if (!MOUSE_EVENTS.includes(event.type)) return;
    if (!containerRef.current) return;
    if (!innerSliderRef.current) return;

    switch (event.type) {
      case 'mouseenter':
        containerRef.current.style.cursor = 'grab';
        break;
      case 'mouseup':
        containerRef.current.style.cursor = 'grab';
        pressed.current = false;
        break;
      case 'mousedown':
        containerRef.current.style.cursor = 'grabbing';
        pressed.current = true;
        startX.current =
          event.nativeEvent.offsetX - innerSliderRef.current.offsetLeft;
        break;
      case 'mousemove':
        if (!pressed.current) return;
        event.preventDefault();
        innerSliderRef.current.style.left = `${
          event.nativeEvent.offsetX - startX.current
        }px`;
        checkBoundary();
        break;
    }
  };

  return (
    <div
      className={styles['slider-container']}
      ref={containerRef}
      onMouseEnter={handleMouse}
      onMouseUp={handleMouse}
      onMouseDown={handleMouse}
      onMouseMove={handleMouse}
    >
      <div className={styles['inner-slider']} ref={innerSliderRef}>
        {Array(CARD_COUNT)
          .fill(0)
          .map((_, index) => (
            <Card key={index} />
          ))}
      </div>
    </div>
  );
};

export default Index;
