'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Grid,
  Text,
  Badge,
  HStack,
  useToast,
  Spinner,
  Center,
  Divider,
  Card,
  CardHeader,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import { EditIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface Fabric {
  id: number;
  fabric: string;
  color: string;
  greigeGsm: string;
  greigeDia: string;
  finishRolls: string;
  weight: string;
  machine: string;
}

interface Process {
  id: number;
  process: string;
}

interface GoodsInward {
  id: string;
  inwNo: string;
  date: string;
  customer: string;
  category: string;
  type: string;
  custDcNo: string;
  dcDate: string;
  custOrdNo: string;
  vehNo: string;
  styleRefNo: string;
  greigeMarkingId: string;
  marketingBy: string;
  preparedBy: string;
  custOrdIncharge: string;
  oldDoNo: string;
  majorFabric: string;
  labNo: string;
  isLabApproved: boolean;
  narration: string;
  fabrics: Fabric[];
  processes: Process[];
}

export default function GoodsInwardDetailPage({ params }: { params: { id: string } }) {
  const [goodsInward, setGoodsInward] = useState<GoodsInward | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchGoodsInward();
  }, []);

  const fetchGoodsInward = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:6660/goodsinward/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch goods inward details');
      }
      
      const data = await response.json();
      setGoodsInward(data);
    } catch (error) {
      console.error('Error fetching goods inward details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load goods inward details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={10}>
        <Center>
          <Spinner size="xl" />
        </Center>
      </Container>
    );
  }

  if (!goodsInward) {
    return (
      <Container maxW="container.xl" py={10}>
        <Box textAlign="center">
          <Heading size="md">Goods Inward record not found</Heading>
          <Link href="/domains/goodsinward" passHref>
            <Button leftIcon={<ArrowBackIcon />} mt={4}>
              Back to List
            </Button>
          </Link>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={5}>
      <Box shadow="md" borderWidth="1px" p={6} borderRadius="md">
        <HStack justifyContent="space-between" mb={6}>
          <Heading size="lg">Goods Inward Details</Heading>
          <HStack>
            <Link href="/domains/goodsinward" passHref>
              <Button leftIcon={<ArrowBackIcon />} variant="outline">
                Back to List
              </Button>
            </Link>
            <Link href={`/domains/goodsinward/${params.id}/edit`} passHref>
              <Button leftIcon={<EditIcon />} colorScheme="teal">
                Edit
              </Button>
            </Link>
          </HStack>
        </HStack>

        <Card mb={6}>
          <CardHeader>
            <Heading size="md">Basic Information</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <Box>
                <Text fontWeight="bold">Inw No:</Text>
                <Text>{goodsInward.inwNo}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Date:</Text>
                <Text>{new Date(goodsInward.date).toLocaleDateString()}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Customer:</Text>
                <Text>{goodsInward.customer}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Category:</Text>
                <Text>{goodsInward.category}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Type:</Text>
                <Text>{goodsInward.type}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Cust DC No:</Text>
                <Text>{goodsInward.custDcNo}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">DC Date:</Text>
                <Text>{goodsInward.dcDate ? new Date(goodsInward.dcDate).toLocaleDateString() : '-'}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Cust Ord No:</Text>
                <Text>{goodsInward.custOrdNo}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Veh No:</Text>
                <Text>{goodsInward.vehNo}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Style Ref No:</Text>
                <Text>{goodsInward.styleRefNo}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Greige Marking ID:</Text>
                <Text>{goodsInward.greigeMarkingId}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Marketing By:</Text>
                <Text>{goodsInward.marketingBy}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Prepared By:</Text>
                <Text>{goodsInward.preparedBy}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Cust Ord Incharge:</Text>
                <Text>{goodsInward.custOrdIncharge}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Old DO No:</Text>
                <Text>{goodsInward.oldDoNo}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Major Fabric:</Text>
                <Text>{goodsInward.majorFabric}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Lab No:</Text>
                <Text>{goodsInward.labNo}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Lab Status:</Text>
                <Badge colorScheme={goodsInward.isLabApproved ? "green" : "red"}>
                  {goodsInward.isLabApproved ? "Approved" : "Pending"}
                </Badge>
              </Box>
              <Box gridColumn="span 2">
                <Text fontWeight="bold">Narration:</Text>
                <Text>{goodsInward.narration}</Text>
              </Box>
            </Grid>
          </CardBody>
        </Card>

        <Card mb={6}>
          <CardHeader>
            <Heading size="md">Fabrics</Heading>
          </CardHeader>
          <CardBody>
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
                {goodsInward.fabrics && goodsInward.fabrics.length > 0 ? (
                  goodsInward.fabrics.map((fabric, index) => (
                    <Tr key={fabric.id}>
                      <Td>{index + 1}</Td>
                      <Td>{fabric.fabric}</Td>
                      <Td>{fabric.color}</Td>
                      <Td>{fabric.greigeGsm}</Td>
                      <Td>{fabric.greigeDia}</Td>
                      <Td>{fabric.finishRolls}</Td>
                      <Td>{fabric.weight}</Td>
                      <Td>{fabric.machine}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={8} textAlign="center">No fabrics found</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Processes</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Process</Th>
                </Tr>
              </Thead>
              <Tbody>
                {goodsInward.processes && goodsInward.processes.length > 0 ? (
                  goodsInward.processes.map((process, index) => (
                    <Tr key={process.id}>
                      <Td>{index + 1}</Td>
                      <Td>{process.process}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={2} textAlign="center">No processes found</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Box>
    </Container>
  );
}