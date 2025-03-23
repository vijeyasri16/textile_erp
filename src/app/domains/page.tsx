'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, IconButton, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function DomainsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex height="100vh" direction="column" position="relative">
      {/* Menu Button with Text */}
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
        <Box
          position="fixed"
          top={0}
          left={0}
          width="250px"
          height="100vh"
          bg="gray.100"
          p={4}
          zIndex={20}
          overflowY="auto"  // Enables scrolling
          maxHeight="100vh"  // Ensures it stays within the viewport
        >
          <VStack spacing={4} align="stretch">
            <Link href="/domains/customer" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Customer</Button>
            </Link>
            <Link href="/domains/cust_list" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">List Customer</Button>
            </Link>
            <Link href="/domains/cust_upd" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Update Customer</Button>
            </Link>
            <Link href="/domains/fabric" passHref>
              <Button width="full" colorScheme="teal" justifyContent="flex-start" textAlign="left">Fabric</Button>
            </Link>
            <Link href="/domains/fab_list" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">List Fabric</Button>
            </Link>
            <Link href="/domains/fab_upd" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Update Fabric</Button>
            </Link>
            <Link href="/domains/machine" passHref>
              <Button width="full" colorScheme="purple" justifyContent="flex-start" textAlign="left">Machine</Button>
            </Link>
            <Link href="/domains/mac_list" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">List Machine</Button>
            </Link>
            <Link href="/domains/mac_upd" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Update Machine</Button>
            </Link>
            <Link href="/domains/supplier" passHref>
              <Button width="full" colorScheme="orange" justifyContent="flex-start" textAlign="left">Supplier</Button>
            </Link>
            <Link href="/domains/sup_list" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">List Supplier</Button>
            </Link>
            <Link href="/domains/sup_upd" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Update Supplier</Button>
            </Link>
            <Link href="/domains/employee" passHref>
              <Button width="full" colorScheme="orange" justifyContent="flex-start" textAlign="left">Employee</Button>
            </Link>
            <Link href="/domains/emp_list" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">List Employee</Button>
            </Link>
            <Link href="/domains/emp_upd" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Update Employee</Button>
            </Link>
            <Link href="/home" passHref>
              <Button width="full" colorScheme="gray" justifyContent="flex-start" textAlign="left">Home</Button>
            </Link>
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
