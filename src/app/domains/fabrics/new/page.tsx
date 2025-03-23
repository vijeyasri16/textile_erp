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

const AddFabric: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [composition, setComposition] = useState('');

  const handleAddFabric = async () => {
    try {
      const response = await fetch('http://localhost:6660/fabrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, composition }),
      });

      if (response.ok) {
        alert('Fabric added successfully!');
        router.push('/domains/fabrics');
      } else {
        console.error('Failed to add fabric');
      }
    } catch (error) {
      console.error('Error adding fabric:', error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Add New Fabric</Heading>

      <Grid templateColumns="1fr" gap={4}>
        <FormControl>
          <FormLabel>Name:</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Composition:</FormLabel>
          <Input type="text" value={composition} onChange={(e) => setComposition(e.target.value)} />
        </FormControl>
      </Grid>

      <Box mt={6} textAlign="center">
        <Button colorScheme="blue" onClick={handleAddFabric}>Create Fabric</Button>
        <Link href="/domains/fabrics" passHref>
          <Button colorScheme="teal" ml={2}>Cancel</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AddFabric;
