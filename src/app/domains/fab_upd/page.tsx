'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Flex
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const UpdateFabric: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); // ✅ FIX: Use useParams() instead of useRouter().query

  const [fabric, setFabric] = useState({
    name: '',
    composition: '',
  });

  useEffect(() => {
    if (!id) return;

    // Simulating fetching fabric data
    const fabrics = [
      { id: 1, name: 'Cotton', composition: '100% Cotton' },
      { id: 2, name: 'Polyester', composition: '80% Polyester, 20% Cotton' },
    ];
    const existingFabric = fabrics.find((f) => f.id === Number(id));
    
    if (existingFabric) {
      setFabric(existingFabric);
    }
  }, [id]);

  const handleUpdate = () => {
    alert('Fabric updated successfully!');
    router.push('/fabric-list'); // ✅ FIX: Corrected navigation for App Router
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Update Fabric</Heading>

      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          value={fabric.name}
          onChange={(e) => setFabric({ ...fabric, name: e.target.value })}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Composition:</FormLabel>
        <Textarea
          value={fabric.composition}
          onChange={(e) => setFabric({ ...fabric, composition: e.target.value })}
        />
      </FormControl>

      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" onClick={handleUpdate}>Update Fabric</Button>
        <Link href="/domains/fab_list">
          <Button colorScheme="teal" ml={2}>Cancel</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default UpdateFabric;
