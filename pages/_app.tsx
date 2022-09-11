import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider as AuthProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AuthProvider session={session}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp
