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

const AddMachine: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [processLinked, setProcessLinked] = useState('');

  const handleAddMachine = async () => {
    try {
      const response = await fetch('http://localhost:6660/machines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, processLinked }),
      });

      if (response.ok) {
        alert('Machine added successfully!');
        router.push('/domains/machines'); // Redirect to machine list
      } else {
        console.error('Failed to add machine');
      }
    } catch (error) {
      console.error('Error adding machine:', error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Add New Machine</Heading>

      <Grid templateColumns="1fr" gap={4}>
        <FormControl>
          <FormLabel>Name:</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Process Linked:</FormLabel>
          <Input type="text" value={processLinked} onChange={(e) => setProcessLinked(e.target.value)} />
        </FormControl>
      </Grid>

      <Box mt={6} textAlign="center">
        <Button colorScheme="blue" onClick={handleAddMachine}>Create Machine</Button>
        <Link href="/domains/machines" passHref>
          <Button colorScheme="teal" ml={2}>Cancel</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AddMachine;
