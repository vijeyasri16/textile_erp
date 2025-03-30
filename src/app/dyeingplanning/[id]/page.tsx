'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Grid, 
  Text, 
  VStack, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td,
  Button,
  HStack,
  Spinner,
  useToast
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DyeingPlanningDetail {
  id: string;
  dlJobNo: string;
  dlRev: string;
  dlDate: string;
  dlCardWeight: string;
  dlMachine: string;
  dlFabric: string;
  dlColour: string;
  dlOldBatchNo: string;
  dlCRCode: string;
  dlCRDate: string;
  dlLRCode: string;
  dlLRDate: string;
  dlLRIndep: string;
  dlLRIndepDate: string;
  dlRemarks: string;
  dlColourIdentification: string;
  stageDetails: Array<{
    dlStage: string;
    dlMLR: string;
    dlTLiquor: string;
  }>;
  itemDetails: Array<{
    dlStage: string;
    dlItemName: string;
    dlValue: string;
    dlGPLPercentage: string;
    dlWeight: string;
  }>;
}

const DyeingPlanningDetailPage = ({ params }: { params: { id: string } }) => {
  const [dyeingPlanning, setDyeingPlanning] = useState<DyeingPlanningDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchDyeingPlanningDetail = async () => {
      try {
        const response = await fetch(`http://localhost:6660/dyeingPlanning/dyeingPlanning/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dyeing planning details');
        }
        const data = await response.json();
        setDyeingPlanning(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dyeing planning details:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dyeing planning details',
          status: 'error',
          duration: 3000,
          isClosable: true
        });
        setIsLoading(false);
        router.push('/dyeingplanning');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchDyeingPlanningDetail();
  }, [params.id]);

  if (isLoading) {
    return (
      <Container centerContent>
        <Spinner size="xl" mt={20} />
      </Container>
    );
  }

  if (!dyeingPlanning) {
    return null;
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" mb={6}>Dyeing Planning Details</Heading>
      
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={6}>
        <Heading as="h2" size="md" mb={4}>Main Information</Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          <VStack align="start" spacing={2}>
            <Text><strong>Job No:</strong> {dyeingPlanning.dlJobNo}</Text>
            <Text><strong>Revision:</strong> {dyeingPlanning.dlRev}</Text>
            <Text><strong>Date:</strong> {dyeingPlanning.dlDate}</Text>
          </VStack>
          <VStack align="start" spacing={2}>
            <Text><strong>Card Weight:</strong> {dyeingPlanning.dlCardWeight}</Text>
            <Text><strong>Machine:</strong> {dyeingPlanning.dlMachine}</Text>
            <Text><strong>Fabric:</strong> {dyeingPlanning.dlFabric}</Text>
          </VStack>
          <VStack align="start" spacing={2}>
            <Text><strong>Colour:</strong> {dyeingPlanning.dlColour}</Text>
            <Text><strong>Old Batch No:</strong> {dyeingPlanning.dlOldBatchNo}</Text>
            <Text><strong>Colour Identification:</strong> {dyeingPlanning.dlColourIdentification}</Text>
          </VStack>
        </Grid>
      </Box>

      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={6}>
        <Heading as="h2" size="md" mb={4}>Stage Details</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Stage</Th>
              <Th>MLR</Th>
              <Th>T Liquor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dyeingPlanning.stageDetails.map((stage, index) => (
              <Tr key={index}>
                <Td>{stage.dlStage}</Td>
                <Td>{stage.dlMLR}</Td>
                <Td>{stage.dlTLiquor}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={6}>
        <Heading as="h2" size="md" mb={4}>Item Details</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Stage</Th>
              <Th>Item Name</Th>
              <Th>Value</Th>
              <Th>GPL %</Th>
              <Th>Weight</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dyeingPlanning.itemDetails.map((item, index) => (
              <Tr key={index}>
                <Td>{item.dlStage}</Td>
                <Td>{item.dlItemName}</Td>
                <Td>{item.dlValue}</Td>
                <Td>{item.dlGPLPercentage}</Td>
                <Td>{item.dlWeight}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {dyeingPlanning.dlRemarks && (
        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="md" mb={4}>Remarks</Heading>
          <Text>{dyeingPlanning.dlRemarks}</Text>
        </Box>
      )}

      <HStack justify="center" mt={6}>
        <Link href={`/dyeingplanning/${params.id}/edit`} passHref>
          <Button colorScheme="green">Edit</Button>
        </Link>
        <Link href="/dyeingplanning" passHref>
          <Button colorScheme="blue">Back to List</Button>
        </Link>
      </HStack>
    </Container>
  );
};

export default DyeingPlanningDetailPage;