"use client";
import React from "react";
import { VStack } from "@chakra-ui/react";
import CampaignDetails from "../components/CampaignDetails";
import Header from "../components/Header";

export default function page() {
    return (
    <VStack>
        <Header/>
        <CampaignDetails/>
    </VStack>)
    
}