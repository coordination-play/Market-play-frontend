import { ChakraProvider } from "@chakra-ui/react";
import { StarknetProvider } from "../utils/providers";
import theme from "../theme";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
    <StarknetProvider>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </StarknetProvider>
    </SessionProvider>
  );
}

export default MyApp;
