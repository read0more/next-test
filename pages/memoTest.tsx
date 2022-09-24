import type { NextPage } from 'next';
import React, { useCallback, useMemo, useState } from 'react';

const MemoTest: NextPage = () => {
  const [value1, setValue1] = useState('0');
  const [value2, setValue2] = useState('1');

  const value1Text = useMemo(() => {
    console.warn('1');
    return `${value1}이냐냐냐냐`;
  }, [value1]);

  const value2Text = useMemo(() => {
    console.warn('2');
    return `${value2}이냐냐냐냐`;
  }, [value2]);

  const useCallbackTest = useCallback(
    (a: number, b: number) => {
      return value1Text + a + b;
    },
    [value1Text] // dependency없으면 value1Text는 계속 초기 값만 가지게 됨
  );

  console.log(useCallbackTest(1, 2));

  return (
    <div>
      <div>
        <label>1</label>
        <input
          type="text"
          value={value1}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue1(event.currentTarget.value)
          }
        />
      </div>
      <div>
        <label>2</label>
        <input
          type="text"
          value={value2}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue2(event.currentTarget.value)
          }
        />
      </div>
      <span>1은 {value1Text}다.</span>
      <span>2는 {value2Text}다.</span>
    </div>
  );
};

export default MemoTest;
