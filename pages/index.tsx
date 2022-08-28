import type { NextPage } from 'next';
import Li from '../components/Li';

const Home: NextPage = () => {
  return (
    <ul>
      <Li img="https://picsum.photos/400/500" index="1" />
    </ul>
  );
};

export default Home;
