"use client";

import { ChakraProvider as ChakraProviderBase } from "@chakra-ui/react";
import theme from "@/theme/theme";

function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProviderBase theme={theme}>{children}</ChakraProviderBase>;
}

export default ChakraProvider;
