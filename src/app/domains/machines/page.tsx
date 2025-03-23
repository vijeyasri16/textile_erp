'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface Machine {
  id: number;
  name: string;
  processLinked: string;
}

const MachineList: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch('http://localhost:6660/machines');
        if (!response.ok) throw new Error('Failed to fetch machines');
        const data = await response.json();
        setMachines(data);
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };

    fetchMachines();
  }, []);

  // Function to delete a machine
  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this machine?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:6660/machines/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMachines(machines.filter((machine) => machine.id !== id));
        }
      } catch (error) {
        console.error('Error deleting machine:', error);
      }
    }
  };

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Machine List</Heading>

      <Button colorScheme="blue" mb={4}>
        <Link href="/machines/new">Add New Machine</Link>
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Process Linked</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {machines.map((machine) => (
            <Tr key={machine.id}>
              <Td>
                <Link href={`/machines/${machine.id}`} passHref>
                  <Button variant="link" colorScheme="blue">{machine.name}</Button>
                </Link>
              </Td>
              <Td>{machine.processLinked}</Td>
              <Td>
                <Link href={`/machines/${machine.id}/edit`} passHref>
                  <Button colorScheme="yellow" size="sm" mr={2}>Edit</Button>
                </Link>
                <IconButton
                  aria-label="Delete machine"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(machine.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MachineList;
