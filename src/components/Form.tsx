import { useForm } from 'react-hook-form';
import {
    Box, SimpleGrid, GridItem, Text, Heading, chakra, Stack, FormControl, FormLabel, Input,
    Textarea, Button, Divider,
    VStack,
    HStack
} from "@chakra-ui/react";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useWriteOrganisationContract } from "../contracts/write";
import { toast } from "sonner";
import { useRouter } from 'next/router';

export default function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: session } = useSession();
    const router = useRouter();

    const uploadPointsMutate = useWriteOrganisationContract(
        "create_campaign",
        {
          successMessage: "Campaign Created successfully",
        }
    );

    const onSubmit = async (values) => {
        console.log(values.campaignName, values.campaignDescription, Math.floor(new Date(values.campaignStart).getTime() / 1000), Math.floor(new Date(values.campaignEnd).getTime() / 1000), values.tokenAddress, values.tokenAllocation)
        toast.promise(
          uploadPointsMutate.writeAsyncAndWait([values.campaignName, values.campaignDescription, Math.floor(new Date(values.campaignStart).getTime() / 1000), Math.floor(new Date(values.campaignEnd).getTime() / 1000), values.tokenAddress, values.tokenAllocation, {views_weightage:1, like_weightage: 2,reply_weightage: 3,retweet_weightage: 4, followers_threshold: 5 ,max_mentions:6, target_handle: '@rgoyal'}]),
          {
            loading: "Creating campaign...",
            success: () => {
              router.push(`/campaignSuccess/${3}`);
              return `Successfully added funds to campaign ${values.name} . Data can take couple minutes to reflect`;
            },
            finally: () => {
              // onClose();
            },
            error: (err) => {
              return err?.message || "Failed to create campaign";
            },
          }
        );
    };

    return (
        <Box bg="#edf3f8" _dark={{ bg: "#111" }} p={10}>
            <Box>
                <SimpleGrid display={{ base: "initial", md: "grid" }} columns={{ md: 3 }} spacing={{ md: 6 }} />
            </Box>
            <Box mt={[10, 0]}>
                <SimpleGrid display={{ base: "initial", md: "grid" }} columns={{ md: 3 }} spacing={{ md: 6 }}>
                    <GridItem colSpan={{ md: 1 }}>
                        <Box px={[4, 0]}>
                            <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                                Create Campaign
                            </Heading>
                            <Text mt={1} fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                                Lore Ipsum Lorem Ipsum
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form onSubmit={handleSubmit(onSubmit)} shadow="base" rounded={[null, "md"]} overflow={{ sm: "hidden" }}>
                            <Stack px={4} py={5} p={[null, 6]} bg="white" _dark={{ bg: "#141517" }} spacing={6}>
                                <SimpleGrid columns={6} spacing={6}>
                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel htmlFor="campaignName">Campaign Name</FormLabel>
                                        <Input {...register("campaignName", { required: true })} />
                                        {errors.campaignName && <Text color="red.500">This field is required</Text>}
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 4]}>
                                        <FormLabel htmlFor="campaignDescription">Description</FormLabel>
                                        <Textarea {...register("campaignDescription")} />
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 4]}>
                                        <FormLabel htmlFor="tokenAddress">Token Address</FormLabel>
                                        <Input {...register("tokenAddress", { required: true })} />
                                        {errors.tokenAddress && <Text color="red.500">This field is required</Text>}
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 4]}>
                                        <FormLabel htmlFor="tokenAllocation">Budget Allocation</FormLabel>
                                        <Input {...register("tokenAllocation", { required: true })} type="number" />
                                        {errors.tokenAllocation && <Text color="red.500">This field is required</Text>}
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel htmlFor="campaignStart">Campaign Start Date</FormLabel>
                                        <Input {...register("campaignStart", { required: true })} type="date" />
                                        {errors.campaignEnd && <Text color="red.500">This field is required</Text>}
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel htmlFor="campaignEnd">Campaign End Date</FormLabel>
                                        <Input {...register("campaignEnd", { required: true })} type="date" />
                                        {errors.campaignEnd && <Text color="red.500">This field is required</Text>}
                                    </FormControl>
                                    <VStack as={GridItem} colSpan={6} mt={5}>
                                        <Divider my="5" borderColor="gray.300" _dark={{ borderColor: "whiteAlpha.300" }} visibility={{ base: "hidden", sm: "visible" }} />
                                        <Heading alignSelf={'flex-start'} fontSize={"lg"} fontWeight={'semibold'}>Tweet Settings</Heading>
                                    </VStack>
                                    <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                                        <FormLabel htmlFor="viewExponent">View Exponent</FormLabel>
                                        <Input {...register("viewExponent")} />
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                                        <FormLabel htmlFor="minFollowers">Min Followers</FormLabel>
                                        <Input {...register("minFollowers")} />
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                                        <FormLabel htmlFor="minImpressions">Min Impressions</FormLabel>
                                        <Input {...register("minImpressions")} />
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                                        <FormLabel htmlFor="maxMentions">Max Mentions</FormLabel>
                                        <Input {...register("maxMentions")} />
                                    </FormControl>
                                    <VStack>
                                    <Heading alignSelf={"start"} fontSize={"md"}  mb={-1}fontWeight={"semibold"}>Campaign for </Heading>
                                        {session ? (
                                            <Button colorScheme="teal" variant={"ghost"} size="md" px={7} py={2} mt={2} onClick={() => signOut()}>
                                                 {/*@ts-ignore */}
                                               {session.user?.id!}
                                            </Button>
                                        ) : (
                                            <Button colorScheme="teal" variant={"outline"} size="md" px={4} py={2} mt={2} onClick={() => signIn('twitter')}>
                                                Connect Twitter
                                            </Button>
                                        )}
                                    </VStack>
                                </SimpleGrid>
                            </Stack>

                            <Box px={{ base: 4, sm: 6 }} py={3} bg="gray.50" _dark={{ bg: "#121212" }} textAlign="right">
                                <Button type="submit" colorScheme="teal" _focus={{ shadow: "" }} fontWeight="md">
                                    Submit
                                </Button>

                            </Box>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
}
