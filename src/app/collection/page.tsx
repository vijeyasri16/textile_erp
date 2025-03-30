'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Heading, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Text,
  VStack,
  HStack,
  IconButton,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface CollectionEntry {
  id: string;
  cVNo: string;
  cDate: string;
  cCustomer: string;
  cPaymentMode: string;
  cTotalAmount: number;
}

const CollectionPage: React.FC = () => {
  const [collections, setCollections] = useState<CollectionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:6660/collection/collection');
      
      if (!response.ok) {
        throw new Error('Failed to fetch collections');
      }

      const data = await response.json();
      setCollections(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching collections:', error);
      toast({
        title: 'Error',
        description: 'Unable to fetch collections',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:6660/collection/collection/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCollections(collections.filter(collection => collection.id !== id));
        toast({
          title: 'Success',
          description: 'Collection deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      } else {
        throw new Error('Failed to delete collection');
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
      toast({
        title: 'Error',
        description: 'Unable to delete collection',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h1">Collections</Heading>
          <Link href="/collection/new" passHref>
            <Button 
              leftIcon={<AddIcon />} 
              colorScheme="blue"
            >
              Create New Collection
            </Button>
          </Link>
        </HStack>

        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Spinner size="xl" />
          </Box>
        ) : collections.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="xl" color="gray.500">
              No collections found. Create your first collection!
            </Text>
          </Box>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>V.No</Th>
                  <Th>Date</Th>
                  <Th>Customer</Th>
                  <Th>Payment Mode</Th>
                  <Th>Total Amount</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {collections.map((collection) => (
                  <Tr key={collection.id}>
                    <Td>{collection.cVNo}</Td>
                    <Td>{new Date(collection.cDate).toLocaleDateString()}</Td>
                    <Td>{collection.cCustomer}</Td>
                    <Td>{collection.cPaymentMode.toUpperCase()}</Td>
                    <Td>{collection.cTotalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</Td>
                    <Td>
                      <HStack>
                        <Link href={`/collection/${collection.id}`} passHref>
                          <IconButton 
                            aria-label="View" 
                            icon={<ViewIcon />} 
                            size="sm" 
                            colorScheme="blue" 
                          />
                        </Link>
                        <Link href={`/collection/${collection.id}/edit`} passHref>
                          <IconButton 
                            aria-label="Edit" 
                            icon={<EditIcon />} 
                            size="sm" 
                            colorScheme="green" 
                          />
                        </Link>
                        <IconButton 
                          aria-label="Delete" 
                          icon={<DeleteIcon />} 
                          size="sm" 
                          colorScheme="red"
                          onClick={() => handleDelete(collection.id)} 
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default CollectionPage;