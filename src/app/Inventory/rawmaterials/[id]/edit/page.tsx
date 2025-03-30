'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex
} from '@chakra-ui/react';

const EditRawMaterial: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [rawMaterial, setRawMaterial] = useState({ name: '', quantity: '', unitOfMeasure: '' });

  useEffect(() => {
    const fetchRawMaterial = async () => {
      try {
        const response = await fetch(`http://localhost:6660/rawmaterials/${id}`);
        if (!response.ok) throw new Error('Failed to fetch raw material');
        const data = await response.json();
        setRawMaterial(data);
      } catch (error) {
        console.error('Error fetching raw material:', error);
      }
    };

    if (id) {
      fetchRawMaterial();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawMaterial({ ...rawMaterial, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:6660/rawmaterials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...rawMaterial,
          quantity: Number(rawMaterial.quantity), 
        }),
      });

      if (response.ok) {
        alert('Raw Material updated successfully!');
        router.push(`/Inventory/rawmaterials/${id}`);
      } else {
        console.error('Failed to update raw material');
      }
    } catch (error) {
      console.error('Error updating raw material:', error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Edit Raw Material</Heading>

      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input type="text" name="name" value={rawMaterial.name} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Quantity:</FormLabel>
        <Input type="number" name="quantity" value={rawMaterial.quantity} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Unit of Measure:</FormLabel>
        <Input type="text" name="unitOfMeasure" value={rawMaterial.unitOfMeasure} onChange={handleChange} />
      </FormControl>

      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" onClick={handleUpdate}>Update Raw Material</Button>
        <Button colorScheme="teal" onClick={() => router.push(`/Inventory/rawmaterials/${id}`)}>Cancel</Button>
      </Flex>
    </Box>
  );
};

export default EditRawMaterial;
