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

const EditMachine: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [machine, setMachine] = useState({ name: '', processLinked: '' });

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const response = await fetch(`http://localhost:6660/machines/${id}`);
        if (!response.ok) throw new Error('Failed to fetch machine');
        const data = await response.json();
        setMachine(data);
      } catch (error) {
        console.error('Error fetching machine:', error);
      }
    };

    if (id) {
      fetchMachine();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMachine({ ...machine, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:6660/machines/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(machine),
      });

      if (response.ok) {
        alert('Machine updated successfully!');
        router.push(`/domains/machines/${id}`);
      } else {
        console.error('Failed to update machine');
      }
    } catch (error) {
      console.error('Error updating machine:', error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Edit Machine</Heading>

      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input type="text" name="name" value={machine.name} onChange={handleChange} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Process Linked:</FormLabel>
        <Input type="text" name="processLinked" value={machine.processLinked} onChange={handleChange} />
      </FormControl>

      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" onClick={handleUpdate}>Update Machine</Button>
        <Button colorScheme="teal" onClick={() => router.push(`/domains/machines/${id}`)}>Cancel</Button>
      </Flex>
    </Box>
  );
};

export default EditMachine;
