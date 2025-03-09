'use client';
import "./globals.css";
import ChakraWrapper from "../components/wrappers/chakraWrapper";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraWrapper>{children}</ChakraWrapper>;
}
