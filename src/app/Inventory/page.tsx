'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, IconButton, Text, Input } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function InventoryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [rawMaterialId, setRawMaterialId] = useState('');

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
            {/* Raw Materials Management */}
            <Heading size="sm" mb={2} color="gray.600">Raw Materials Management</Heading>
            <Link href="Inventory/rawmaterials" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Raw Material List</Button>
            </Link>
            <Link href="Inventory/rawmaterials/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Add Raw Material</Button>
            </Link>
            <Input 
              placeholder="Enter Raw Material ID"
              value={rawMaterialId}
              onChange={(e) => setRawMaterialId(e.target.value)}
              size="sm"
            />
            <Link href={rawMaterialId ? `Inventory/rawmaterials/${rawMaterialId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="yellow" justifyContent="flex-start" isDisabled={!rawMaterialId}>
                Update Raw Material
              </Button>
            </Link>
            <Link href="/home" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Home</Button>
            </Link>            
          </VStack>
        </Box>
      )}
      

      {/* Main Content */}
      <Flex flex={1} align="center" justify="center" bg="gray.50" height="100vh">
        <Heading size="2xl" color="gray.700">Inventory Management</Heading>
      </Flex>
    </Flex>
  );
}