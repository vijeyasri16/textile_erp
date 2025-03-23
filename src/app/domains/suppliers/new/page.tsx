'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Textarea,
  Grid
} from '@chakra-ui/react';
import Link from 'next/link';

const AddSupplier: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleAddSupplier = async () => {
    try {
      const response = await fetch('http://localhost:6660/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, deliveryAddress }),
      });

      if (response.ok) {
        alert('Supplier added successfully!');
        router.push('/suppliers');
      } else {
        console.error('Failed to add supplier');
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Add New Supplier</Heading>

      <Grid templateColumns="1fr" gap={4}>
        <FormControl>
          <FormLabel>Name:</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Phone No:</FormLabel>
          <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Delivery Address:</FormLabel>
          <Textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
        </FormControl>
      </Grid>

      <Box mt={6} textAlign="center">
        <Button colorScheme="blue" onClick={handleAddSupplier}>Create Supplier</Button>
        <Link href="/suppliers" passHref>
          <Button colorScheme="teal" ml={2}>Cancel</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AddSupplier;
