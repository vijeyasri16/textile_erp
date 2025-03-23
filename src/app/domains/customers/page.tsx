'use client';

import React, { useEffect, useState } from 'react';
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
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface Customer {
  id: number;
  name: string;
  phone: string;
  deliveryAddress: string;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:6660/customers');
        if (!response.ok) throw new Error('Failed to fetch customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Function to delete a customer
  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this customer?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:6660/customers/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setCustomers(customers.filter((customer) => customer.id !== id));
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Customer List</Heading>

      <Button colorScheme="blue" mb={4}>
        <Link href="/customers/new">Add New Customer</Link>
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Delivery Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer) => (
            <Tr key={customer.id}>
              <Td>
                <Link href={`/customers/${customer.id}`} passHref>
                  <Button variant="link" colorScheme="blue">{customer.name}</Button>
                </Link>
              </Td>
              <Td>{customer.phone}</Td>
              <Td>{customer.deliveryAddress}</Td>
              <Td>
                <Link href={`/customers/${customer.id}/edit`} passHref>
                  <Button colorScheme="yellow" size="sm" mr={2}>Edit</Button>
                </Link>
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
    </Box>
  );
};

export default CustomerList;
