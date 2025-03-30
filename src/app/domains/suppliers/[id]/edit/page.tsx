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

const EditSupplier: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [supplier, setSupplier] = useState({ name: '', phone: '', supplierAddress: '' });

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch(`http://localhost:6660/suppliers/${id}`);
        if (!response.ok) throw new Error('Failed to fetch supplier');
        const data = await response.json();
        setSupplier(data);
      } catch (error) {
        console.error('Error fetching supplier:', error);
      }
    };

    if (id) {
      fetchSupplier();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:6660/suppliers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplier),
      });

      if (response.ok) {
        alert('Supplier updated successfully!');
        router.push(`/domains/suppliers/${id}`);
      } else {
        console.error('Failed to update supplier');
      }
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Edit Supplier</Heading>

      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input type="text" name="name" value={supplier.name} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Phone No:</FormLabel>
        <Input type="text" name="phone" value={supplier.phone} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Supplier Address:</FormLabel>
        <Textarea name="supplierAddress" value={supplier.supplierAddress} onChange={handleChange} />
      </FormControl>

      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" onClick={handleUpdate}>Update Supplier</Button>
        <Button colorScheme="teal" onClick={() => router.push(`/suppliers/${id}`)}>Cancel</Button>
      </Flex>
    </Box>
  );
};

export default EditSupplier;
