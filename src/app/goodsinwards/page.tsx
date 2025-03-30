'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Flex,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Badge,
  Select,
  HStack,
  Text,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GoodsInwards {
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
}

const GoodsInwardsListPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [goodsInwardsList, setGoodsInwardsList] = useState<GoodsInwards[]>([]);
  const [filteredList, setFilteredList] = useState<GoodsInwards[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('gDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  useEffect(() => {
    fetchGoodsInwards();
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    filterAndSortData();
  }, [searchTerm, sortField, sortDirection, categoryFilter, goodsInwardsList]);

  const fetchGoodsInwards = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:6660/goodsInwards/goodsInwards');
      
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      
      const data = await response.json();
      setGoodsInwardsList(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching goods inwards:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortData = () => {
    let filtered = [...goodsInwardsList];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.gInwNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.gCustomer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.gCustOrdNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.gCustDCNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(item => item.gCategory === categoryFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const fieldA = a[sortField as keyof GoodsInwards];
      const fieldB = b[sortField as keyof GoodsInwards];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      }
      
      return 0;
    });
    
    setFilteredList(filtered);
  };

  const handleSort = (field: string) => {
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(`http://localhost:6660/goodsinwards/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          toast({
            title: 'Record deleted.',
            description: 'The goods inwards record has been removed successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          
          // Refresh data
          fetchGoodsInwards();
        } else {
          throw new Error(`Failed to delete: ${response.statusText}`);
        }
      } catch (err) {
        toast({
          title: 'Error',
          description: err instanceof Error ? err.message : 'Failed to delete the record',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.error('Error deleting record:', err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" mb={6}>Goods Inwards</Heading>
      
      <Flex mb={6} flexDirection={{ base: "column", md: "row" }} gap={3}>
        <InputGroup maxW={{ base: "100%", md: "300px" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input 
            placeholder="Search by Inw No, Customer, Order No..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        
        <Select 
          placeholder="Filter by Category" 
          maxW={{ base: "100%", md: "200px" }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </Select>
        
        <Spacer />
        
        <Link href="/goodsinwards/new" passHref>
          <Button leftIcon={<AddIcon />} colorScheme="blue">
            Add New
          </Button>
        </Link>
      </Flex>
      
      {isLoading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" />
        </Flex>
      ) : error ? (
        <Alert status="error" mb={6}>
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th cursor="pointer" onClick={() => handleSort('gInwNo')}>
                  Inw No {sortField === 'gInwNo' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Th>
                <Th cursor="pointer" onClick={() => handleSort('gDate')}>
                  Date {sortField === 'gDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Th>
                <Th cursor="pointer" onClick={() => handleSort('gCustomer')}>
                  Customer {sortField === 'gCustomer' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Th>
                <Th cursor="pointer" onClick={() => handleSort('gCategory')}>
                  Category {sortField === 'gCategory' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Th>
                <Th cursor="pointer" onClick={() => handleSort('gType')}>
                  Type {sortField === 'gType' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Th>
                <Th>DC No</Th>
                <Th>Order No</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredList.length > 0 ? (
                filteredList.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.gInwNo}</Td>
                    <Td>{formatDate(item.gDate)}</Td>
                    <Td>{item.gCustomer}</Td>
                    <Td>{item.gCategory}</Td>
                    <Td>{item.gType}</Td>
                    <Td>{item.gCustDCNo}</Td>
                    <Td>{item.gCustOrdNo}</Td>
                    <Td>
                      <Badge colorScheme={item.gLabApproved ? "green" : "orange"}>
                        {item.gLabApproved ? "Approved" : "Pending"}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="View details"
                          icon={<ViewIcon />}
                          size="sm"
                          colorScheme="blue"
                          onClick={() => router.push(`/goodsinwards/${item.id}`)}
                        />
                        <IconButton
                          aria-label="Edit record"
                          icon={<EditIcon />}
                          size="sm"
                          colorScheme="teal"
                          onClick={() => router.push(`/goodsinwards/${item.id}/edit`)}
                        />
                        <IconButton
                          aria-label="Delete record"
                          icon={<DeleteIcon />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(item.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={9} textAlign="center" py={6}>
                    <Text fontSize="lg">No records found</Text>
                    <Text color="gray.500" mt={2}>
                      {searchTerm || categoryFilter 
                        ? "Try adjusting your search or filters" 
                        : "Add a new goods inwards record to get started"}
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      )}
    </Container>
  );
};

export default GoodsInwardsListPage;