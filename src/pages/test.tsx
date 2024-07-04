"use client";

import React from "react";
import { VStack } from "@chakra-ui/react";
import CampaignList from "../components/CampaignList";
import CampaignDetails from "../components/CampaignDetails";
import ContributorList from "../components/ContributorList";
export default function page() {
    return (
    <VStack>
        <ContributorList />
    </VStack>)
    
}