'use client';

import React, { useState, useEffect } from 'react';
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
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const UpdateSupplier: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); // ✅ FIX: Use useParams() instead of useRouter().query

  const [supplier, setSupplier] = useState({
    name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (!id) return;

    // Simulating fetching supplier data
    const suppliers = [
      { id: 1, name: 'ABC Textiles', phone: '123-456-7890', address: '123 Main St, City' },
      { id: 2, name: 'XYZ Fabrics', phone: '987-654-3210', address: '456 Market St, Town' },
    ];
    const existingSupplier = suppliers.find((s) => s.id === Number(id));

    if (existingSupplier) {
      setSupplier(existingSupplier);
    }
  }, [id]);

  const handleUpdate = () => {
    alert('Supplier updated successfully!');
    router.push('/supplier-list'); // ✅ FIX: Corrected navigation for App Router
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Update Supplier</Heading>

      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          value={supplier.name}
          onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Phone No:</FormLabel>
        <Input
          type="text"
          value={supplier.phone}
          onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Address:</FormLabel>
        <Textarea
          value={supplier.address}
          onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
        />
      </FormControl>

      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" onClick={handleUpdate}>Update Supplier</Button>
        <Link href="/dommains/sup_list">
          <Button colorScheme="teal" ml={2}>Cancel</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default UpdateSupplier;
