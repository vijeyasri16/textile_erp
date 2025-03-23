'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  IconButton
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface Customer {
  id: number;
  name: string;
  phone: string;
  deliveryAddress: string;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: 'John Doe', phone: '1234567890', deliveryAddress: '123 Street, NY' },
    { id: 2, name: 'Jane Smith', phone: '9876543210', deliveryAddress: '456 Avenue, CA' },
  ]);

  // Function to delete a customer
  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this customer?');
    if (confirmed) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Customer List</Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Delivery Address</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer) => (
            <Tr key={customer.id}>
              <Td>{customer.name}</Td>
              <Td>{customer.phone}</Td>
              <Td>{customer.deliveryAddress}</Td>
              <Td>
                <IconButton
                  aria-label="Delete customer"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(customer.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={6} textAlign="center">
              
              <Link href="/domains" passHref>
                <Button colorScheme="teal" ml={2}>Exit</Button>
              </Link>
            </Box>
    </Box>
  );
};

export default CustomerList;
