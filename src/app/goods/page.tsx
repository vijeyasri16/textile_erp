'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, IconButton, Text, Input } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function GoodsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [goodsInwardId, setGoodsInwardId] = useState(''); // State for Goods Inward ID input

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
            
            {/* Goods Management */}
            <Heading size="sm" mt={6} mb={2} color="gray.600">Goods Management</Heading>
            <Link href="goods_inward" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Goods List</Button>
            </Link>
            <Link href="goods_inward/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Add Goods</Button>
            </Link>
            <Input 
              placeholder="Enter Goods ID"
              value={goodsInwardId}
              onChange={(e) => setGoodsInwardId(e.target.value)}
              size="sm"
            />
            <Link href={goodsInwardId ? `goods_inward/${goodsInwardId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="yellow" justifyContent="flex-start" isDisabled={!goodsInwardId}>
                Update Goods
              </Button>
            </Link>

          </VStack>
        </Box>
      )}

      {/* Main Content */}
      <Flex flex={1} align="center" justify="center" bg="gray.50" height="100vh">
        <Heading size="2xl" color="gray.700">Goods Navigation</Heading>
      </Flex>
    </Flex>
  );
}
