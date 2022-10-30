import type { AppProps } from "next/app";
import "../styles/global.scss";

import Head from "next/head";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Nitro Fueled Typeracer</title>
        <meta
          name="description"
          content="Test your typing skills with Nitro Fueled Typeracer!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
