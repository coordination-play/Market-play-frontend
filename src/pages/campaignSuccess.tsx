"use client";
import React from "react";
import { VStack } from "@chakra-ui/react";
import CampaignSuccess from "../components/CampaignSuccess";
import Header from "../components/Header";

export default function page() {
    return (
    <VStack>
        <Header/>
        <CampaignSuccess/>
    </VStack>)
    
}