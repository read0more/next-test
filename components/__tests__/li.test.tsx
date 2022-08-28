import { render, screen } from '@testing-library/react';
import Li, { Props } from '../Li';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('Li', () => {
  it('renders a Li', async () => {
    const sample: Props = {
      index: '1',
      img: 'https://test.com',
    };

    render(<Li {...sample} />);

    const list = screen.getByRole('listitem');
    const img = list.getElementsByTagName('img')[0];

    expect(list).toHaveTextContent(sample.index);
    expect(img).toHaveAttribute('src', sample.img);
  });
});
