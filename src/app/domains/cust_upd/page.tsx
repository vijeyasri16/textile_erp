'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Correct import
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex
} from '@chakra-ui/react';
import Link from 'next/link';

const UpdateCustomer: React.FC = () => {
  const { id } = useParams(); // Corrected useParams() for Next.js App Router
  const router = useRouter();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Simulate fetching customer data
    const customers = [
      { id: '1', name: 'John Doe', phone: '123-456-7890', address: '123 Main St' },
      { id: '2', name: 'Jane Smith', phone: '987-654-3210', address: '456 Oak St' },
    ];
    const existingCustomer = customers.find((c) => c.id === id);
    if (existingCustomer) {
      setCustomer(existingCustomer);
    }
  }, [id]);

  const handleUpdate = () => {
    alert('Customer updated successfully!');
    router.push('/customer-list');
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Update Customer</Heading>

      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Phone No:</FormLabel>
        <Input
          type="text"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Address:</FormLabel>
        <Textarea
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
        />
      </FormControl>

      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" onClick={handleUpdate}>Update Customer</Button>
        <Link href="/domains/cust_list" passHref>
          <Button colorScheme="teal" ml={2}>Cancel</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default UpdateCustomer;
