'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Grid, 
  VStack, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td,
  Button,
  HStack 
} from '@chakra-ui/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface LabDetailItem {
  lSNo: number;
  lColour: string;
  lPantoneNo: string;
  lJobNo: string;
  lFabricLight: string;
  lFastness: string;
  lApprovalBy: string;
  lRemarks: string;
}

interface LabEntryDetail {
  id: string;
  lLabNo: string;
  lDate: string;
  lReference: string;
  lContactPerson: string;
  lCustomer: string;
  lCancelled: boolean;
  labDetails: LabDetailItem[];
}

const LabEntryDetailPage: React.FC = () => {
  const params = useParams();
  const [labEntry, setLabEntry] = useState<LabEntryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLabEntryDetails = async () => {
      try {
        const response = await fetch(`http://localhost:6660/labEntry/getLabEntry/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lab entry details');
        }
        const data = await response.json();
        setLabEntry(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchLabEntryDetails();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={6}>
        <Text>Loading lab entry details...</Text>
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

  if (!labEntry) {
    return (
      <Container maxW="container.xl" py={6}>
        <Text>No lab entry found</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1">Lab Entry Details</Heading>

        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="md" mb={4}>Main Information</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            <VStack align="start" spacing={2}>
              <Text><strong>Lab No:</strong> {labEntry.lLabNo}</Text>
              <Text><strong>Date:</strong> {new Date(labEntry.lDate).toLocaleDateString()}</Text>
            </VStack>
            <VStack align="start" spacing={2}>
              <Text><strong>Reference:</strong> {labEntry.lReference}</Text>
              <Text><strong>Contact Person:</strong> {labEntry.lContactPerson}</Text>
            </VStack>
            <VStack align="start" spacing={2}>
              <Text><strong>Customer:</strong> {labEntry.lCustomer}</Text>
              <Text>
                <strong>Status:</strong> 
                <Text as="span" color={labEntry.lCancelled ? 'red.500' : 'green.500'} ml={2}>
                  {labEntry.lCancelled ? 'Cancelled' : 'Active'}
                </Text>
              </Text>
            </VStack>
          </Grid>
        </Box>

        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="md" mb={4}>Lab Details</Heading>
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Colour</Th>
                  <Th>Pantone No</Th>
                  <Th>Job No</Th>
                  <Th>Fabric Light Source</Th>
                  <Th>Fastness</Th>
                  <Th>Approval By</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>
                {labEntry.labDetails.map((detail) => (
                  <Tr key={detail.lSNo}>
                    <Td>{detail.lSNo}</Td>
                    <Td>{detail.lColour}</Td>
                    <Td>{detail.lPantoneNo}</Td>
                    <Td>{detail.lJobNo}</Td>
                    <Td>{detail.lFabricLight}</Td>
                    <Td>{detail.lFastness}</Td>
                    <Td>{detail.lApprovalBy}</Td>
                    <Td>{detail.lRemarks}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>

        <HStack spacing={4} justifyContent="center">
          <Link href={`/labentry/edit/${labEntry.id}`} passHref>
            <Button colorScheme="green">
              Edit Lab Entry
            </Button>
          </Link>
          <Link href="/labentry" passHref>
            <Button colorScheme="blue" variant="outline">
              Back to Lab Entries
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Container>
  );
};

export default LabEntryDetailPage;