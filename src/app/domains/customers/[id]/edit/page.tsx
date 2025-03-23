'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

const EditCustomer: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [customer, setCustomer] = useState({ name: '', phone: '', deliveryAddress: '' });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:6660/customers/${id}`);
        if (!response.ok) throw new Error('Failed to fetch customer');
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:6660/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        alert('Customer updated successfully!');
        router.push(`/customers/${id}`);
      } else {
        console.error('Failed to update customer');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Edit Customer</Heading>

      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input type="text" name="name" value={customer.name} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Phone No:</FormLabel>
        <Input type="text" name="phone" value={customer.phone} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Delivery Address:</FormLabel>
        <Textarea name="deliveryAddress" value={customer.deliveryAddress} onChange={handleChange} />
      </FormControl>

      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" onClick={handleUpdate}>Update Customer</Button>
        <Button colorScheme="teal" onClick={() => router.push(`/customers/${id}`)}>Cancel</Button>
      </Flex>
    </Box>
  );
};

export default EditCustomer;
