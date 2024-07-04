import { ChakraProvider } from "@chakra-ui/react";
import { StarknetProvider } from "../utils/providers";
import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StarknetProvider>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </StarknetProvider>
  );
}

export default MyApp;
