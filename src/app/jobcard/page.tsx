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
  VStack, 
  HStack,
  Text,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface JobCard {
  id: string;
  jcDate: string;
  jcCustomer: string;
  jcBatchNo: string;
  jcJobCardCompletion: boolean;
  jcJobCardIssued: boolean;
}

const JobCardPage: React.FC = () => {
  const [jobCards, setJobCards] = useState<JobCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchJobCards();
  }, []);

  const fetchJobCards = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:6660/jobCard/jobCards');
      if (!response.ok) {
        throw new Error('Failed to fetch job cards');
      }
      const data = await response.json();
      setJobCards(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching job cards:', error);
      toast({
        title: "Error",
        description: "Failed to fetch job cards",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:6660/jobCard/jobCard/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Job Card deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true
        });
        fetchJobCards();
      } else {
        throw new Error('Failed to delete job card');
      }
    } catch (error) {
      console.error('Error deleting job card:', error);
      toast({
        title: "Error",
        description: "Failed to delete job card",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h1">Job Cards</Heading>
          <Link href="/jobcard/new">
            <Button 
              leftIcon={<AddIcon />} 
              colorScheme="blue"
            >
              Create New Job Card
            </Button>
          </Link>
        </HStack>

        {isLoading ? (
          <Text>Loading job cards...</Text>
        ) : jobCards.length === 0 ? (
          <Text>No job cards found</Text>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Customer</Th>
                  <Th>Batch No</Th>
                  <Th>Job Card Completion</Th>
                  <Th>Job Card Issued</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {jobCards.map((jobCard) => (
                  <Tr key={jobCard.id}>
                    <Td>{jobCard.jcDate}</Td>
                    <Td>{jobCard.jcCustomer}</Td>
                    <Td>{jobCard.jcBatchNo}</Td>
                    <Td>
                      {jobCard.jcJobCardCompletion ? 'Yes' : 'No'}
                    </Td>
                    <Td>
                      {jobCard.jcJobCardIssued ? 'Yes' : 'No'}
                    </Td>
                    <Td>
                      <HStack>
                        <Link href={`/jobcard/${jobCard.id}/edit`}>
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
                          onClick={() => handleDelete(jobCard.id)}
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

export default JobCardPage;