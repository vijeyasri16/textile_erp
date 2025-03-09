'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, IconButton, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function FinishingPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex height="100vh" direction="column" position="relative">
      {/* Menu Button with Text */}
      <Flex align="center" cursor="pointer" onClick={toggleSidebar} p={4} position="absolute" top={4} left={4} zIndex={20}>
        <IconButton
          aria-label="Toggle Menu"
          icon={<HamburgerIcon />}
          variant="ghost"
        />
        <Text ml={2} fontSize="lg" fontWeight="bold">Menu</Text>
      </Flex>

      {/* Sidebar Overlay */}
      {isOpen && (
        <Box position="fixed" top={0} left={0} width="100vw" height="100vh" bg="rgba(0, 0, 0, 0.5)" zIndex={10} onClick={toggleSidebar} />
      )}
      
      {/* Sidebar */}
      {isOpen && (
        <Box position="fixed" top={0} left={0} width="250px" height="100vh" bg="gray.100" p={4} zIndex={20}>
          <VStack spacing={4} align="stretch">
            <Link href="/finishing/finishing-prod" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Finishing Production</Button>
            </Link>
            <Link href="/home" passHref>
              <Button width="full" colorScheme="teal" justifyContent="flex-start" textAlign="left">Home</Button>
            </Link>
          </VStack>
        </Box>
      )}

      {/* Main Content */}
      <Flex flex={1} align="center" justify="center" bg="gray.50" height="100vh">
        <Heading size="2xl" color="gray.700">Finishing Section</Heading>
      </Flex>
    </Flex>
  );
}