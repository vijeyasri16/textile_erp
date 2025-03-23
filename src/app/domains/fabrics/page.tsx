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

interface Fabric {
  id: number;
  name: string;
  composition: string;
}

const FabricList: React.FC = () => {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);

  useEffect(() => {
    fetch('http://localhost:6660/fabrics')
      .then(res => res.json())
      .then(setFabrics)
      .catch(console.error);
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this fabric?')) {
      try {
        const response = await fetch(`http://localhost:6660/fabrics/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setFabrics(fabrics.filter((fabric) => fabric.id !== id));
        }
      } catch (error) {
        console.error('Error deleting fabric:', error);
      }
    }
  };

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Fabric List</Heading>

      <Button colorScheme="blue" mb={4}>
        <Link href="/domains/fabrics/new">Add New Fabric</Link>
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Composition</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fabrics.map((fabric) => (
            <Tr key={fabric.id}>
              <Td>
                <Link href={`/domains/fabrics/${fabric.id}`} passHref>
                  <Button variant="link" colorScheme="blue">{fabric.name}</Button>
                </Link>
              </Td>
              <Td>{fabric.composition}</Td>
              <Td>
                <Link href={`/domains/fabrics/${fabric.id}/edit`} passHref>
                  <Button colorScheme="yellow" size="sm" mr={2}>Edit</Button>
                </Link>
                <IconButton
                  aria-label="Delete fabric"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(fabric.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default FabricList;
