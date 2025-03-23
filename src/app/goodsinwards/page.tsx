'use client';
import React, { useState, useEffect } from 'react';
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
  HStack,
  useToast,
  Spinner,
  Center,
  Badge,
  IconButton,
  Flex,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { AddIcon, EditIcon, ViewIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface GoodsInward {
  id: string;
  inwNo: string;
  date: string;
  customer: string;
  type: string;
  category: string;
  custDcNo: string;
  isLabApproved: boolean;
}

const GoodsInwardListPage = () => {
  const [goodsInwards, setGoodsInwards] = useState<GoodsInward[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchGoodsInwards();
  }, []);

  const fetchGoodsInwards = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:6660/goodsinward');
      
      if (!response.ok) {
        throw new Error('Failed to fetch goods inward data');
      }
      
      const data = await response.json();
      setGoodsInwards(data);
    } catch (error) {
      console.error('Error fetching goods inward data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load goods inward data',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this goods inward record?')) {
      try {
        const response = await fetch(`http://localhost:6660/goodsinward/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete goods inward record');
        }
        
        setGoodsInwards(goodsInwards.filter(item => item.id !== id));
        toast({
          title: 'Success',
          description: 'Goods inward record deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error deleting goods inward record:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete goods inward record',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const filteredGoodsInwards = goodsInwards.filter(item => 
    item.inwNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.custDcNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxW="container.xl" py={5}>
      <Box shadow="md" borderWidth="1px" p={6} borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading size="lg">Goods Inward</Heading>
          <Link href="/domains/goodsinward/new" passHref>
            <Button leftIcon={<AddIcon />} colorScheme="blue">
              Add New
            </Button>
          </Link>
        </Flex>

        <InputGroup mb={6}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input 
            placeholder="Search by Inw No, Customer, or DC No" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        {isLoading ? (
          <Center py={10}>
            <Spinner size="xl" />
          </Center>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Inw No</Th>
                  <Th>Date</Th>
                  <Th>Customer</Th>
                  <Th>Type</Th>
                  <Th>Category</Th>
                  <Th>DC No</Th>
                  <Th>Lab Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredGoodsInwards.length === 0 ? (
                  <Tr>
                    <Td colSpan={8} textAlign="center" py={4}>
                      No goods inward records found
                    </Td>
                  </Tr>
                ) : (
                  filteredGoodsInwards.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.inwNo}</Td>
                      <Td>{new Date(item.date).toLocaleDateString()}</Td>
                      <Td>{item.customer}</Td>
                      <Td>{item.type}</Td>
                      <Td>{item.category}</Td>
                      <Td>{item.custDcNo}</Td>
                      <Td>
                        <Badge colorScheme={item.isLabApproved ? "green" : "red"}>
                          {item.isLabApproved ? "Approved" : "Pending"}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <Link href={`/domains/goodsinward/${item.id}`} passHref>
                            <IconButton
                              aria-label="View details"
                              icon={<ViewIcon />}
                              size="sm"
                              colorScheme="blue"
                            />
                          </Link>
                          <Link href={`/domains/goodsinward/${item.id}/edit`} passHref>
                            <IconButton
                              aria-label="Edit"
                              icon={<EditIcon />}
                              size="sm"
                              colorScheme="teal"
                            />
                          </Link>
                          <IconButton
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleDelete(item.id)}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default GoodsInwardListPage;