import { ChakraProvider } from "@chakra-ui/react";
// import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { StarknetProvider } from "../utils/providers";
import theme from "../theme";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";


const queryClient = new QueryClient()


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
    <SessionProvider session={pageProps.session}>

    <StarknetProvider>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </StarknetProvider>
    </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
