'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const UpdateMachine: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); // ✅ FIX: Use useParams() instead of useRouter().query

  const [machine, setMachine] = useState({
    name: '',
    processes: [] as string[],
  });
  const [process, setProcess] = useState('');

  useEffect(() => {
    if (!id) return;

    // Simulating fetching machine data
    const machines = [
      { id: 1, name: 'Lathe Machine', processes: ['Turning', 'Drilling'] },
      { id: 2, name: 'Milling Machine', processes: ['Milling', 'Cutting'] },
    ];
    const existingMachine = machines.find((m) => m.id === Number(id));

    if (existingMachine) {
      setMachine(existingMachine);
    }
  }, [id]);

  const handleAddProcess = () => {
    if (process.trim() !== '' && !machine.processes.includes(process)) {
      setMachine({ ...machine, processes: [...machine.processes, process] });
      setProcess('');
    }
  };

  const handleRemoveProcess = (index: number) => {
    setMachine({ ...machine, processes: machine.processes.filter((_, i) => i !== index) });
  };

  const handleUpdate = () => {
    alert('Machine updated successfully!');
    router.push('/machine-list'); // ✅ FIX: Corrected navigation for App Router
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Update Machine</Heading>

      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          value={machine.name}
          onChange={(e) => setMachine({ ...machine, name: e.target.value })}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Process Linked:</FormLabel>
        <Grid templateColumns="3fr auto" gap={2}>
          <Input
            type="text"
            value={process}
            onChange={(e) => setProcess(e.target.value)}
          />

        </Grid>
      </FormControl>

      {/* Display Added Processes */}
      <Stack direction="row" wrap="wrap" mt={2}>
        {machine.processes.map((proc, index) => (
          <Tag key={index} colorScheme="blue" size="lg">
            <TagLabel>{proc}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveProcess(index)} />
          </Tag>
        ))}
      </Stack>

      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" onClick={handleUpdate}>Update Machine</Button>
        <Link href="/domains/mac_list">
          <Button colorScheme="teal" ml={2}>Cancel</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default UpdateMachine;
