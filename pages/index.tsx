import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
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
  );
};

export default Home;
