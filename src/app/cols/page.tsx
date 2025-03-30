'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, IconButton, Text, Input } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function CollectionSectionsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [collectionId, setCollectionId] = useState('');
  const [finishingId, setFinishingId] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex height="100vh" direction="column" position="relative">
      <Flex align="center" cursor="pointer" onClick={toggleSidebar} p={4} position="absolute" top={4} left={4} zIndex={20}>
        <IconButton aria-label="Toggle Menu" icon={<HamburgerIcon />} variant="ghost" />
        <Text ml={2} fontSize="lg" fontWeight="bold">Menu</Text>
      </Flex>

      {isOpen && <Box position="fixed" top={0} left={0} width="100vw" height="100vh" bg="rgba(0, 0, 0, 0.5)" zIndex={10} onClick={toggleSidebar} />}

      {isOpen && (
        <Box position="fixed" top={0} left={0} width="250px" height="100vh" bg="gray.100" p={4} zIndex={20} overflowY="auto">
          <VStack spacing={4} align="stretch">
            <Heading size="sm" mt={6} mb={2} color="gray.600">Collection and Finishing Management</Heading>

            <Heading size="xs" mt={4} mb={2} color="gray.500">Collections</Heading>
            <Link href="/collection" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Collections List</Button>
            </Link>
            <Link href="/collection/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Create New Collection</Button>
            </Link>
            <Input 
              placeholder="Enter Collection ID"
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              size="sm"
            />
            <Link href={collectionId ? `/collection/${collectionId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="purple" justifyContent="flex-start" isDisabled={!collectionId}>
                Edit Collection
              </Button>
            </Link>

            <Heading size="xs" mt={4} mb={2} color="gray.500">Finishing</Heading>
            <Link href="/finishing" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Finishing List</Button>
            </Link>
            <Link href="/finishing/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Create New Finishing</Button>
            </Link>
            <Input 
              placeholder="Enter Finishing ID"
              value={finishingId}
              onChange={(e) => setFinishingId(e.target.value)}
              size="sm"
            />
            <Link href={finishingId ? `/finishing/${finishingId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="purple" justifyContent="flex-start" isDisabled={!finishingId}>
                Edit Finishing
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Home</Button>
            </Link>

          </VStack>
        </Box>
      )}
      

      <Flex flex={1} align="center" justify="center" bg="gray.50" height="100vh">
        <Heading size="2xl" color="gray.700">Collection and Finishing Management</Heading>
      </Flex>
    </Flex>
  );
}
