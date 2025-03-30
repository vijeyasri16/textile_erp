'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Grid, 
  Text, 
  VStack, 
  HStack, 
  Divider, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast
} from '@chakra-ui/react';
import Link from 'next/link';

interface JobCardDetail {
  id: string;
  jcDate: string;
  jcShift: string;
  jcLoadTime: string;
  jcUnloadTime: string;
  jcIdleHours: string;
  jcRunHours: string;
  jcRopeLength: string;
  jcSpeed: string;
  jcPreTreatment: string;
  jcDyeBath: string;
  jcDyes: string;
  jcAlkali: string;
  jcAfterTreatment: string;
  jcSLDate: string;
  jcCustomer: string;
  jcColour: string;
  jcBatchNo: string;
  jcLotNo: string;
  jcFRNNo: string;
  jcMachineNo: string;
  jcCustomerDCNo: string;
  jcWeight: string;
  jcMLR: string;
  jcRoll: string;
  jcFabricType: string;
  jcLabNo: string;
  jcGSM: string;
  jcScourBathPH: string;
  jcResH2O2: string;
  jcStartBathPH: string;
  jcAlkaliBathPH: string;
  jcSoapingPH: string;
  jcDyeFixingPH: string;
  jcFinalBathPH: string;
  jcDyeStartVolume: string;
  jcDosageVolume: string;
  jcPreTreatmentDetails: Array<{
    jcSNo: number;
    jcPretreatment: string;
    jcItem: string;
    jcRequiredQty: string;
    jcTemperature: string;
    jcTime: string;
    jcStartTime: string;
    jcFinishTime: string;
    jcDosingAndSteamTime: string;
  }>;
  jcJobCardCompletion: boolean;
  jcJobCardIssued: boolean;
}

const JobCardDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [jobCard, setJobCard] = useState<JobCardDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchJobCardDetails();
  }, [params.id]);

  const fetchJobCardDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:6660/jobCard/jobCard/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch job card details');
      }
      
      const data = await response.json();
      setJobCard(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching job card details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch job card details",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Text>Loading job card details...</Text>;
  }

  if (!jobCard) {
    return <Text>Job card not found</Text>;
  }

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h1">Job Card Details</Heading>
          <HStack>
            <Link href={`/jobcard/${params.id}/edit`}>
              <Button colorScheme="green">Edit</Button>
            </Link>
            <Link href="/jobcard">
              <Button colorScheme="blue">Back to List</Button>
            </Link>
          </HStack>
        </HStack>

        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
          {/* Basic Information */}
          <Heading as="h2" size="md" mb={4}>Basic Information</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Date:</Text>
              <Text>{jobCard.jcDate}</Text>
            </VStack>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Shift:</Text>
              <Text>{jobCard.jcShift}</Text>
            </VStack>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Load Time:</Text>
              <Text>{jobCard.jcLoadTime}</Text>
            </VStack>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Unload Time:</Text>
              <Text>{jobCard.jcUnloadTime}</Text>
            </VStack>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Idle Hours:</Text>
              <Text>{jobCard.jcIdleHours}</Text>
            </VStack>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Run Hours:</Text>
              <Text>{jobCard.jcRunHours}</Text>
            </VStack>
          </Grid>

          <Divider my={6} />

          {/* Pre-Treatment Details */}
          <Heading as="h2" size="md" mb={4}>Pre-Treatment Details</Heading>
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Pre-treatment</Th>
                  <Th>Item</Th>
                  <Th>Required Qty</Th>
                  <Th>Temperature</Th>
                  <Th>Time</Th>
                  <Th>Start Time</Th>
                  <Th>Finish Time</Th>
                  <Th>Dosing & Steam Time</Th>
                </Tr>
              </Thead>
              <Tbody>
                {jobCard.jcPreTreatmentDetails.map((detail) => (
                  <Tr key={detail.jcSNo}>
                    <Td>{detail.jcSNo}</Td>
                    <Td>{detail.jcPretreatment}</Td>
                    <Td>{detail.jcItem}</Td>
                    <Td>{detail.jcRequiredQty}</Td>
                    <Td>{detail.jcTemperature}</Td>
                    <Td>{detail.jcTime}</Td>
                    <Td>{detail.jcStartTime}</Td>
                    <Td>{detail.jcFinishTime}</Td>
                    <Td>{detail.jcDosingAndSteamTime}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Divider my={6} />

          {/* Additional Details */}
          <Heading as="h2" size="md" mb={4}>Additional Details</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Customer:</Text>
              <Text>{jobCard.jcCustomer}</Text>
            </VStack>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Batch No:</Text>
              <Text>{jobCard.jcBatchNo}</Text>
            </VStack>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Lot No:</Text>
              <Text>{jobCard.jcLotNo}</Text>
            </VStack>
          </Grid>

          <Divider my={6} />

          {/* Job Card Status */}
          <Heading as="h2" size="md" mb={4}>Job Card Status</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Job Card Completion:</Text>
              <Text>{jobCard.jcJobCardCompletion ? 'Yes' : 'No'}</Text>
            </VStack>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Job Card Issued:</Text>
              <Text>{jobCard.jcJobCardIssued ? 'Yes' : 'No'}</Text>
            </VStack>
          </Grid>
        </Box>
      </VStack>
    </Container>
  );
};

export default JobCardDetailPage;