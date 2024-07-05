"use client";
import React from "react";

import { sepolia, Chain } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
  useInjectedConnectors,
  jsonRpcProvider,
  voyager
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [
      argent(),
      braavos(),
    ],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "onlyIfNoConnectors",
    // Randomize the order of the connectors.
    order: "random"
  });

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={jsonRpcProvider({
        rpc: (chain: Chain) => {
          if (chain.id !== sepolia.id) {
            alert("Unsupported chain. Please switch to Startnet Sepolia");
            return null;
          }

          return {
            nodeUrl: `https://starknet-sepolia.public.blastapi.io/rpc/v0_7`,
          };
        },
      })}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
