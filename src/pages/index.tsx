import Head from "next/head";

import Home from "./Home";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => {
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

      <Home />
    </>
  );
};
