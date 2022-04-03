import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Arabic Spelling Corrector</title>
        <meta charSet="utf8"></meta>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="A powerful spell corrector for any type of text in Arabic"
        ></meta>
        <meta
          name="keywords"
          content="Arabic, Spell Corrector, Sentiment, Entity Recognition"
        ></meta>
      </Head>
      <Navbar />
      <Container mx={0} my={15} maxW="none">
        {children}
      </Container>
    </div>
  );
}

export default Layout;
