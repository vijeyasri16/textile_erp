'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, IconButton, Text, Input } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function DomainsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [customerId, setCustomerId] = useState(''); // State to store customer ID input

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex height="100vh" direction="column" position="relative">
      {/* Menu Button */}
      <Flex align="center" cursor="pointer" onClick={toggleSidebar} p={4} position="absolute" top={4} left={4} zIndex={20}>
        <IconButton aria-label="Toggle Menu" icon={<HamburgerIcon />} variant="ghost" />
        <Text ml={2} fontSize="lg" fontWeight="bold">Menu</Text>
      </Flex>

      {/* Sidebar Overlay */}
      {isOpen && (
        <Box position="fixed" top={0} left={0} width="100vw" height="100vh" bg="rgba(0, 0, 0, 0.5)" zIndex={10} onClick={toggleSidebar} />
      )}

      {/* Sidebar with Scrollable Content */}
      {isOpen && (
        <Box position="fixed" top={0} left={0} width="250px" height="100vh" bg="gray.100" p={4} zIndex={20} overflowY="auto">
          <VStack spacing={4} align="stretch">
            {/* Customer Management */}
            <Heading size="sm" mb={2} color="gray.600">Customer Management</Heading>
            <Link href="domains/customers" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Customer List</Button>
            </Link>
            <Link href="domains/customers/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Add Customer</Button>
            </Link>

            {/* 🔹 Input Field for Customer ID */}
            <Input 
              placeholder="Enter Customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              size="sm"
            />

            {/* 🔹 Button to Navigate to Update Page */}
            <Link href={customerId ? `domain/customers/${customerId}/edit` : '#'} passHref>
              <Button 
                width="full" 
                colorScheme="yellow" 
                justifyContent="flex-start" 
                isDisabled={!customerId}
              >
                Update Customer
              </Button>
            </Link>

            {/* Other sections remain unchanged */}
          </VStack>
        </Box>
      )}

      {/* Main Content */}
      <Flex flex={1} align="center" justify="center" bg="gray.50" height="100vh">
        <Heading size="2xl" color="gray.700">Domains Navigation</Heading>
      </Flex>
    </Flex>
  );
}
