import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { trpc } from '@/lib/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(MyApp);
