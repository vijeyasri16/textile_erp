'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Box, 
  Button, 
  Container, 
  Heading, 
  VStack, 
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Grid,
  GridItem,
  useToast
} from '@chakra-ui/react';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';

interface ProductionDetail {
  fSNo: number;
  fProdType: string;
  fProcess: string;
  fWeight: string;
  fRemarks: string;
}

interface FinishingEntryDetail {
  id: string;
  fMachine: string;
  fDate: string;
  fShift: string;
  fSupervisor: string;
  fOperator: string;
  productionDetails: ProductionDetail[];
}

const FinishingDetailPage: React.FC = () => {
  const [finishingEntry, setFinishingEntry] = useState<FinishingEntryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const toast = useToast();

  useEffect(() => {
    const fetchFinishingEntryDetails = async () => {
      try {
        const response = await fetch(`http://localhost:6660/finishing/getFinishingEntry/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch finishing entry details');
        }
        
        const data = await response.json();
        setFinishingEntry(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching finishing entry details:', error);
        toast({
          title: "Error",
          description: "Failed to fetch finishing entry details",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (params.id) {
      fetchFinishingEntryDetails();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={6}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (!finishingEntry) {
    return (
      <Container maxW="container.xl" py={6}>
        <Text>No finishing entry found</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h1">Finishing Entry Details</Heading>
          <HStack>
            <Link href="/finishing">
              <Button 
                leftIcon={<ArrowBackIcon />} 
                colorScheme="gray"
              >
                Back to List
              </Button>
            </Link>
            <Link href={`/finishing/edit/${finishingEntry.id}`}>
              <Button 
                leftIcon={<EditIcon />} 
                colorScheme="blue"
              >
                Edit Entry
              </Button>
            </Link>
          </HStack>
        </HStack>

        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
            <GridItem>
              <Text fontWeight="bold">Machine:</Text>
              <Text>{finishingEntry.fMachine}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Date:</Text>
              <Text>{finishingEntry.fDate}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Shift:</Text>
              <Text>{finishingEntry.fShift}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Supervisor:</Text>
              <Text>{finishingEntry.fSupervisor}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Operator:</Text>
              <Text>{finishingEntry.fOperator}</Text>
            </GridItem>
          </Grid>

          <Heading as="h3" size="md" mb={4}>Production Details</Heading>
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Prod Type</Th>
                  <Th>Process</Th>
                  <Th>Weight</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>
                {finishingEntry.productionDetails.map((detail) => (
                  <Tr key={detail.fSNo}>
                    <Td>{detail.fSNo}</Td>
                    <Td>{detail.fProdType}</Td>
                    <Td>{detail.fProcess}</Td>
                    <Td>{detail.fWeight}</Td>
                    <Td>{detail.fRemarks}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default FinishingDetailPage;