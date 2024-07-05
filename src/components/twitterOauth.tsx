import { VStack, Button } from "@chakra-ui/react";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
export default function TwitterOAuth() {
    const { data: session } = useSession();
    return (
        <VStack>
            {session ? (
                <Button colorScheme="teal" variant={"ghost"} size="md" px={7} py={2} mt={2} onClick={() => signOut()}>
                    Hello, {session.user?.name}. {/* @ts-ignore */}
                    Your user ID is {session.user?.id!}
                </Button>
            ) : (
                <Button colorScheme="teal" variant={"outline"} size="md" px={4} py={2} mt={2} onClick={() => signIn('twitter')}>
                    Verify Twitter
                </Button>
            )}
        </VStack>
    );
}
