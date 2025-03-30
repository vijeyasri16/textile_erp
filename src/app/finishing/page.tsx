'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  VStack, 
  HStack,
  Text,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { AddIcon, ViewIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface FinishingEntry {
  id: string;
  fMachine: string;
  fDate: string;
  fShift: string;
  fSupervisor: string;
  fOperator: string;
}

const FinishingPage: React.FC = () => {
  const [finishingEntries, setFinishingEntries] = useState<FinishingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  // Fetch finishing entries
  const fetchFinishingEntries = async () => {
    try {
      const response = await fetch('http://localhost:6660/finishing/getAllFinishingEntries');
      if (!response.ok) {
        throw new Error('Failed to fetch finishing entries');
      }
      const data = await response.json();
      setFinishingEntries(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching finishing entries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch finishing entries",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  // Delete finishing entry
  const handleDeleteEntry = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:6660/finishing/deleteFinishingEntry/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Finishing entry deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchFinishingEntries(); // Refresh the list
      } else {
        throw new Error('Failed to delete finishing entry');
      }
    } catch (error) {
      console.error('Error deleting finishing entry:', error);
      toast({
        title: "Error",
        description: "Failed to delete finishing entry",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchFinishingEntries();
  }, []);

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h1">Finishing Entries</Heading>
          <Link href="/finishing/new">
            <Button 
              leftIcon={<AddIcon />} 
              colorScheme="blue"
            >
              Create New Entry
            </Button>
          </Link>
        </HStack>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : finishingEntries.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="xl">No Finishing Entries Found</Text>
          </Box>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Machine</Th>
                  <Th>Shift</Th>
                  <Th>Supervisor</Th>
                  <Th>Operator</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {finishingEntries.map((entry) => (
                  <Tr key={entry.id}>
                    <Td>{entry.fDate}</Td>
                    <Td>{entry.fMachine}</Td>
                    <Td>{entry.fShift}</Td>
                    <Td>{entry.fSupervisor}</Td>
                    <Td>{entry.fOperator}</Td>
                    <Td>
                      <HStack>
                        <Link href={`/finishing/${entry.id}`}>
                          <IconButton 
                            aria-label="View Details" 
                            icon={<ViewIcon />} 
                            size="sm" 
                            colorScheme="blue"
                          />
                        </Link>
                        <Link href={`/finishing/${entry.id}/edit`}>
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
                          onClick={() => handleDeleteEntry(entry.id)}
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

export default FinishingPage;