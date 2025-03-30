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
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface DyeingPlanningRecord {
  id: string;
  dlJobNo: string;
  dlDate: string;
  dlFabric: string;
  dlColour: string;
}

const DyeingPlanningPage: React.FC = () => {
  const [dyeingPlannings, setDyeingPlannings] = useState<DyeingPlanningRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchDyeingPlannings = async () => {
      try {
        const response = await fetch('http://localhost:6660/dyeingPlanning/dyeingPlannings');
        if (!response.ok) {
          throw new Error('Failed to fetch dyeing plannings');
        }
        const data = await response.json();
        setDyeingPlannings(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dyeing plannings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dyeing planning records',
          status: 'error',
          duration: 3000,
          isClosable: true
        });
        setIsLoading(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchDyeingPlannings();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:6660/dyeingPlanning/dyeingPlanning/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setDyeingPlannings(dyeingPlannings.filter(record => record.id !== id));
        toast({
          title: 'Success',
          description: 'Dyeing planning record deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      } else {
        throw new Error('Failed to delete dyeing planning record');
      }
    } catch (error) {
      console.error('Error deleting dyeing planning record:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete dyeing planning record',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Container maxW="container.xl" py={6}>
      <HStack justify="space-between" mb={6}>
        <Heading as="h1">Dyeing Planning</Heading>
        <Link href="/dyeingplanning/new" passHref>
          <Button 
            leftIcon={<AddIcon />} 
            colorScheme="blue"
          >
            Create New
          </Button>
        </Link>
      </HStack>

      {isLoading ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" />
        </Box>
      ) : dyeingPlannings.length === 0 ? (
        <Text textAlign="center" py={10}>
          No dyeing planning records found
        </Text>
      ) : (
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Job No</Th>
                <Th>Date</Th>
                <Th>Fabric</Th>
                <Th>Colour</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dyeingPlannings.map((record) => (
                <Tr key={record.id}>
                  <Td>{record.dlJobNo}</Td>
                  <Td>{record.dlDate}</Td>
                  <Td>{record.dlFabric}</Td>
                  <Td>{record.dlColour}</Td>
                  <Td>
                    <HStack>
                      <Link href={`/dyeingplanning/${record.id}/edit`} passHref>
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
                        onClick={() => handleDelete(record.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Container>
  );
};

export default DyeingPlanningPage;