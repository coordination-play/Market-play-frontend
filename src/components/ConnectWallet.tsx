// WalletManager.tsx
"use client";
import React from "react";
import { useAccount, useConnect, useDisconnect, Connector } from "@starknet-react/core";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Text
} from "@chakra-ui/react";

export default function WalletManager() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  
  const addressShort = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null;

  return (
    <Box w="full" p={4}>
      <Button onClick={onOpen} variant="solid" alignSelf={"stretch"} size={"md"} colorScheme={"teal"}>
        {address ? `Disconnect Wallet: ${addressShort}` : "Connect Wallet"}
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{address ? "Disconnect Wallet" : "Connect Wallet"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {address ? (
              <>
                <Text mb={4}>Connected as {addressShort}</Text>
                <Button colorScheme="red" mb={2} onClick={() => {
                  disconnect();
                  onClose();
                }}>
                  Disconnect
                </Button>
              </>
            ) : (
              <Box>
                {connectors.map((connector: Connector) => (
                  <Button
                    key={connector.id}
                    my={4}
                    colorScheme={"orange"}
                    onClick={() => {
                      connect({ connector });
                      onClose();
                    }}
                    isDisabled={!connector.available()}
                  >
                    Connect {connector.name}
                  </Button>
                ))}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
