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

const EditFabric: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [fabric, setFabric] = useState({ name: '', composition: '' });

  useEffect(() => {
    fetch(`http://localhost:6660/fabrics/${id}`)
      .then(res => res.json())
      .then(setFabric)
      .catch(console.error);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFabric({ ...fabric, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:6660/fabrics/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fabric),
    });
    router.push(`/domains/fabrics/${id}`);
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Edit Fabric</Heading>

      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input name="name" value={fabric.name} onChange={handleChange} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Composition:</FormLabel>
        <Input name="composition" value={fabric.composition} onChange={handleChange} />
      </FormControl>

      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" onClick={handleUpdate}>Update Fabric</Button>
        <Button colorScheme="teal" onClick={() => router.push(`/domains/fabrics/${id}`)}>Cancel</Button>
      </Flex>
    </Box>
  );
};

export default EditFabric;
