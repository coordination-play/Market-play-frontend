"use client";

import React from "react";
import { VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import ContributorLinkedSuccess from "../components/ContributorLinkedSuccess";
export default function page() {
    return (
    <VStack>
        <Header/>
        <ContributorLinkedSuccess/>
    </VStack>)
    
}