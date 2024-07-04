import { Flex, Heading, VStack } from "@chakra-ui/react";
import { SiMarketo } from "react-icons/si";

export const Hero = ({ project, title }: { project: string, title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <VStack>
      <SiMarketo size="3em"/> 
      <Heading mt={4} color={"teal"} fontSize="2vw">{project}</Heading>
      <Heading
        fontSize="4vw"
        bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)" // Apply gradient to this title
        bgClip="text"
      >
        {title}
      </Heading>
    </VStack>
  </Flex>
);

Hero.defaultProps = {
  project: "Grow My Tribe",
  title: "Accelerate Web3 Growth",
};
