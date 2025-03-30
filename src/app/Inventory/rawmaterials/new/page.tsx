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
  Grid
} from '@chakra-ui/react';
import Link from 'next/link';

const AddRawMaterial: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');

  const handleAddRawMaterial = async () => {
    try {
      const response = await fetch('http://localhost:6660/rawmaterials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quantity: Number(quantity), unitOfMeasure }),
      });

      if (response.ok) {
        alert('Raw Material added successfully!');
        router.push('/Inventory/rawmaterials');
      } else {
        console.error('Failed to add raw material');
      }
    } catch (error) {
      console.error('Error adding raw material:', error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Add New Raw Material</Heading>

      <Grid templateColumns="1fr" gap={4}>
        <FormControl>
          <FormLabel>Name:</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Quantity:</FormLabel>
          <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Unit of Measure:</FormLabel>
          <Input type="text" value={unitOfMeasure} onChange={(e) => setUnitOfMeasure(e.target.value)} />
        </FormControl>
      </Grid>

      <Box mt={6} textAlign="center">
        <Button colorScheme="blue" onClick={handleAddRawMaterial}>Create Raw Material</Button>
        <Link href="/Inventory/rawmaterials" passHref>
          <Button colorScheme="teal" ml={2}>Cancel</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AddRawMaterial;
