import { ComboBox } from './components';

const Home = (): JSX.Element => {
  return (
    <main className='flex min-h-screen flex-col gap-y-6 p-10'>
      <h1 className='text-custom-white mx-auto text-4xl font-bold'>Carbon Footprint Explorer</h1>
      <ComboBox />
    </main>
  );
};

export default Home;
