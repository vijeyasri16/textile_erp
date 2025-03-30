'use client';

import React, { useState, useEffect, use } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Grid,
  Flex,
  Spacer,
  Badge,
  HStack,
  Divider,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
  AlertIcon,
  Stat,
  StatLabel,
  StatNumber,
  Card,
  CardHeader,
  CardBody,
  Stack
} from '@chakra-ui/react';
import { 
  EditIcon, 
  ArrowBackIcon
} from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Fabric {
  gSNo: number;
  gFabric: string;
  gColor: string;
  gGreigeGSM: string;
  gGreigeDIA: string;
  gFinishRolls: string;
  gWeight: string;
  gMachine: string;
}

interface Process {
  gSNo: number;
  gProcess: string;
}

interface GoodsInwardsDetails {
  id: string;
  gInwNo: string;
  gDate: string;
  gCustomer: string;
  gCategory: string;
  gType: string;
  gLabApproved: boolean;
  gCustDCNo: string;
  gCustDCDate: string;
  gCustOrdNo: string;
  gVehNo: string;
  gStyleRefNo: string;
  gGreigeMarkingID: string;
  gMarketingBy: string;
  gPreparedBy: string;
  gCustOrdIncharge: string;
  gOldDONo: string;
  gMajorFabric: string;
  gLabNo: string;
  gNarration: string;
  fabrics: Fabric[];
  processes: Process[];
}

const GoodsInwardsDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = use(params);
  const router = useRouter();
  const [goodsInwards, setGoodsInwards] = useState<GoodsInwardsDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchGoodsInwardsDetails();
  }, [id]);

  const fetchGoodsInwardsDetails = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:6660/goodsInwards/goodsInwards/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      
      const data = await response.json();
      setGoodsInwards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching goods inwards details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={6}>
        <Flex justify="center" align="center" height="50vh">
          <Spinner size="xl" />
        </Flex>
      </Container>
    );
  }

  if (error || !goodsInwards) {
    return (
      <Container maxW="container.xl" py={6}>
        <Alert status="error" mb={6}>
          <AlertIcon />
          {error || "Failed to load goods inwards details"}
        </Alert>
        <Button 
          leftIcon={<ArrowBackIcon />} 
          onClick={() => router.push('/goodsinwards')}
        >
          Back to List
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Flex mb={6} alignItems="center">
        <Button 
          leftIcon={<ArrowBackIcon />} 
          variant="outline" 
          onClick={() => router.push('/goodsinwards')}
          mr={4}
        >
          Back
        </Button>
        
        <Heading as="h1" size="lg">
          Goods Inwards Details
        </Heading>
        
        <Spacer />
        
        <HStack spacing={3}>
          <Link href={`/goodsinwards/${id}/edit`} passHref>
            <Button leftIcon={<EditIcon />} colorScheme="teal">
              Edit
            </Button>
          </Link>
        </HStack>
      </Flex>
      
      <Box py={4} px={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white" mb={6}>
        <Flex flexDirection={{ base: "column", md: "row" }} alignItems="center" mb={3}>
          <HStack spacing={4}>
            <Heading as="h2" size="xl">
              {goodsInwards.gInwNo}
            </Heading>
            <Badge colorScheme={goodsInwards.gLabApproved ? "green" : "orange"} fontSize="md" py={1} px={2}>
              {goodsInwards.gLabApproved ? "Lab Approved" : "Pending Approval"}
            </Badge>
          </HStack>
          <Spacer />
          <Text color="gray.600" fontSize="md" mt={{ base: 2, md: 0 }}>
            Created on {formatDate(goodsInwards.gDate)}
          </Text>
        </Flex>
        
        <Divider my={4} />
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={6}>
          <Stat>
            <StatLabel>Customer</StatLabel>
            <StatNumber fontSize="lg">{goodsInwards.gCustomer}</StatNumber>
          </Stat>
          
          <Stat>
            <StatLabel>Category</StatLabel>
            <StatNumber fontSize="lg">{goodsInwards.gCategory}</StatNumber>
          </Stat>
          
          <Stat>
            <StatLabel>Type</StatLabel>
            <StatNumber fontSize="lg">{goodsInwards.gType}</StatNumber>
          </Stat>
        </Grid>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
          <Box>
            <Text fontWeight="semibold">Cust DC No</Text>
            <Text>{goodsInwards.gCustDCNo || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">DC Date</Text>
            <Text>{formatDate(goodsInwards.gCustDCDate) || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">Customer Order No</Text>
            <Text>{goodsInwards.gCustOrdNo || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">Vehicle No</Text>
            <Text>{goodsInwards.gVehNo || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">Style Ref No</Text>
            <Text>{goodsInwards.gStyleRefNo || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">Greige Marking ID</Text>
            <Text>{goodsInwards.gGreigeMarkingID || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">Marketing By</Text>
            <Text>{goodsInwards.gMarketingBy || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">Prepared By</Text>
            <Text>{goodsInwards.gPreparedBy || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">Cust Order Incharge</Text>
            <Text>{goodsInwards.gCustOrdIncharge || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">Old DO No</Text>
            <Text>{goodsInwards.gOldDONo || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">Major Fabric</Text>
            <Text>{goodsInwards.gMajorFabric || '-'}</Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold">Lab No</Text>
            <Text>{goodsInwards.gLabNo || '-'}</Text>
          </Box>
        </Grid>
      </Box>
      
      <Stack spacing={6} direction={{ base: "column", lg: "row" }}>
        <Card flex="2" variant="outline">
          <CardHeader>
            <Heading size="md">Fabrics</Heading>
          </CardHeader>
          <CardBody>
            {goodsInwards.fabrics && goodsInwards.fabrics.length > 0 ? (
              <Box overflowX="auto">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>S.No</Th>
                      <Th>Fabric</Th>
                      <Th>Color</Th>
                      <Th>Greige GSM</Th>
                      <Th>Greige DIA</Th>
                      <Th>Finish Rolls</Th>
                      <Th>Weight</Th>
                      <Th>Machine</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {goodsInwards.fabrics.map((fabric) => (
                      <Tr key={fabric.gSNo}>
                        <Td>{fabric.gSNo}</Td>
                        <Td>{fabric.gFabric}</Td>
                        <Td>{fabric.gColor}</Td>
                        <Td>{fabric.gGreigeGSM}</Td>
                        <Td>{fabric.gGreigeDIA}</Td>
                        <Td>{fabric.gFinishRolls}</Td>
                        <Td>{fabric.gWeight}</Td>
                        <Td>{fabric.gMachine}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <Text color="gray.500">No fabrics added</Text>
            )}
          </CardBody>
        </Card>
        
        <Card flex="1" variant="outline">
          <CardHeader>
            <Heading size="md">Processes</Heading>
          </CardHeader>
          <CardBody>
            {goodsInwards.processes && goodsInwards.processes.length > 0 ? (
              <Box overflowX="auto">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>S.No</Th>
                      <Th>Process</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {goodsInwards.processes.map((process) => (
                      <Tr key={process.gSNo}>
                        <Td>{process.gSNo}</Td>
                        <Td>{process.gProcess}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <Text color="gray.500">No processes added</Text>
            )}
          </CardBody>
        </Card>
      </Stack>
      
      {goodsInwards.gNarration && (
        <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
          <Heading size="sm" mb={2}>Narration</Heading>
          <Text>{goodsInwards.gNarration}</Text>
        </Box>
      )}
    </Container>
  );
};

export default GoodsInwardsDetailsPage;