"use client";
import React from "react";
import { useRouter } from 'next/router'

import { VStack } from "@chakra-ui/react";
import CampaignSuccess from "../../components/CampaignSuccess";
import Header from "../../components/Header";

export default function page() {
    const router = useRouter()
    const id = router.query.id;

    return (
    <VStack>
        <Header/>
        <CampaignSuccess id= {id as string}/>
    </VStack>)
    
}