'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, IconButton, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function InventoryPage() {
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
            <Link href="/Inventory/ad-hoc_Stock-in" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Ad-hoc Stock In</Button>
            </Link>
            <Link href="/Inventory/ad-hoc_Stock-out" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Ad-hoc Stock Out</Button>
            </Link>
            <Link href="/Inventory/dc-inward-bill-passing" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">DC Inward Bill Passing</Button>
            </Link>
            <Link href="/Inventory/dc-purchase-inward" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">DC Purchase Inward</Button>
            </Link>
            <Link href="/Inventory/dc-purchase-return" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">DC Purchase Return</Button>
            </Link>
            <Link href="/Inventory/dye-dispatch" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Dye Dispatch</Button>
            </Link>
            <Link href="/Inventory/goods-received-note" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Goods Received Note</Button>
            </Link>
            <Link href="/Inventory/purchase-order" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Purchase Order</Button>
            </Link>
            <Link href="/Inventory/purchase-return" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Purchase Return</Button>
            </Link>
            <Link href="/Inventory/stock-modification" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Stock Modification</Button>
            </Link>
            <Link href="/Inventory/stock-transfer-in" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Stock Transfer In</Button>
            </Link>
            <Link href="/Inventory/stock-transfer-out" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start" textAlign="left">Stock Transfer Out</Button>
            </Link>
            <Link href="/home" passHref>
              <Button width="full" colorScheme="teal" justifyContent="flex-start" textAlign="left">Home</Button>
            </Link>
          </VStack>
        </Box>
      )}

      {/* Main Content */}
      <Flex flex={1} align="center" justify="center" bg="gray.50" height="100vh">
        <Heading size="2xl" color="gray.700">Inventory Section</Heading>
      </Flex>
    </Flex>
  );
}
