'use client';

import React, { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Stack,
  Tag,
  TagLabel,
  Flex,
  IconButton
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface Machine {
  id: number;
  name: string;
  processes: string[];
}

const MachineList: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([
    { id: 1, name: 'Lathe Machine', processes: ['Turning', 'Drilling'] },
    { id: 2, name: 'Milling Machine', processes: ['Milling', 'Cutting'] },
  ]);

  // Function to delete a machine
  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this machine?');
    if (confirmed) {
      setMachines(machines.filter((machine) => machine.id !== id));
    }
  };

  return (
    <Box maxW="700px" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading size="lg" textAlign="center" mb={6}>Machine List</Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Processes Linked</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {machines.map((machine) => (
            <Tr key={machine.id}>
              <Td>{machine.name}</Td>
              <Td>
                <Stack direction="row" wrap="wrap">
                  {machine.processes.map((proc, index) => (
                    <Tag key={index} colorScheme="blue" size="sm">
                      <TagLabel>{proc}</TagLabel>
                    </Tag>
                  ))}
                </Stack>
              </Td>
              <Td>
                <IconButton
                  aria-label="Delete machine"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(machine.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={6} textAlign="center">
        
        <Link href="/domains" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default MachineList;
