import { Flex, Heading, VStack } from "@chakra-ui/react";
import { SiMarketo } from "react-icons/si";

export const Hero = ({ project, title }: { project: string, title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="100vh"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  ><VStack>
  <SiMarketo />

 <Heading fontSize="2vw">{project}</Heading>
 <Heading fontSize="4vw">{title}</Heading>
  </VStack>
   
  </Flex>
);

Hero.defaultProps = {
  project: "Grow My DAO",
  title: "Accelerate Web3 Growth",
};
