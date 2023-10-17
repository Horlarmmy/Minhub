import "../styles/globals.css";
import { useState } from "react";
import { ContractFactory, ethers } from "ethers";
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
