'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Button, 
  HStack, 
  IconButton,
  Text,
  VStack
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface LabEntry {
  id: string;
  lLabNo: string;
  lDate: string;
  lReference: string;
  lCustomer: string;
  lCancelled: boolean;
}

const LabEntryPage: React.FC = () => {
  const [labEntries, setLabEntries] = useState<LabEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLabEntries = async () => {
      try {
        const response = await fetch('http://localhost:6660/labEntry/getAllLabEntries');
        if (!response.ok) {
          throw new Error('Failed to fetch lab entries');
        }
        const data = await response.json();
        setLabEntries(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchLabEntries();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:6660/labEntry/deleteLabEntry/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setLabEntries(labEntries.filter(entry => entry.id !== id));
      } else {
        throw new Error('Failed to delete lab entry');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while deleting');
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={6}>
        <Text>Loading lab entries...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={6}>
        <Text color="red.500">Error: {error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h1">Lab Entries</Heading>
          <Link href="/labentry/new" passHref>
            <Button 
              leftIcon={<AddIcon />} 
              colorScheme="blue"
            >
              Create New Lab Entry
            </Button>
          </Link>
        </HStack>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Lab No</Th>
                <Th>Date</Th>
                <Th>Reference</Th>
                <Th>Customer</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {labEntries.map((entry) => (
                <Tr key={entry.id}>
                  <Td>{entry.lLabNo}</Td>
                  <Td>{new Date(entry.lDate).toLocaleDateString()}</Td>
                  <Td>{entry.lReference}</Td>
                  <Td>{entry.lCustomer}</Td>
                  <Td>
                    <Text 
                      color={entry.lCancelled ? 'red.500' : 'green.500'}
                    >
                      {entry.lCancelled ? 'Cancelled' : 'Active'}
                    </Text>
                  </Td>
                  <Td>
                    <HStack>
                      <Link href={`/labentry/${entry.id}`} passHref>
                        <IconButton
                          aria-label="View Details"
                          icon={<ViewIcon />}
                          size="sm"
                          colorScheme="blue"
                        />
                      </Link>
                      <Link href={`/labentry/${entry.id}/edit`} passHref>
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
                        onClick={() => handleDelete(entry.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Container>
  );
};

export default LabEntryPage;