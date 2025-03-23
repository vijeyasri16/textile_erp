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
  IconButton,
  Flex
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface Fabric {
  id: number;
  name: string;
  composition: string;
}

const FabricList: React.FC = () => {
  const [fabrics, setFabrics] = useState<Fabric[]>([
    { id: 1, name: 'Cotton', composition: '100% Cotton' },
    { id: 2, name: 'Polyester', composition: '80% Polyester, 20% Cotton' },
  ]);

  // Function to delete a fabric
  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this fabric?');
    if (confirmed) {
      setFabrics(fabrics.filter((fabric) => fabric.id !== id));
    }
  };

  return (
    <Box maxW="700px" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading size="lg" textAlign="center" mb={6}>Fabric List</Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Composition</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fabrics.map((fabric) => (
            <Tr key={fabric.id}>
              <Td>{fabric.name}</Td>
              <Td>{fabric.composition}</Td>
              <Td>
                <IconButton
                  aria-label="Delete fabric"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(fabric.id)}
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

export default FabricList;
