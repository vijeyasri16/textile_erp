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

interface RawMaterial {
  id: number;
  name: string;
  quantity: number;
  unitOfMeasure: string;
}

const RawMaterialList: React.FC = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await fetch('http://localhost:6660/rawmaterials');
        if (!response.ok) throw new Error('Failed to fetch raw materials');
        const data = await response.json();
        setRawMaterials(data);
      } catch (error) {
        console.error('Error fetching raw materials:', error);
      }
    };

    fetchRawMaterials();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this raw material?')) {
      try {
        const response = await fetch(`http://localhost:6660/rawmaterials/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setRawMaterials(rawMaterials.filter((rm) => rm.id !== id));
        }
      } catch (error) {
        console.error('Error deleting raw material:', error);
      }
    }
  };

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Raw Materials</Heading>

      <Button colorScheme="blue" mb={4}>
        <Link href="/Inventory/rawmaterials/new">Add New Raw Material</Link>
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Quantity</Th>
            <Th>Unit of Measure</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rawMaterials.map((rm) => (
            <Tr key={rm.id}>
              <Td>
                <Link href={`/Inventory/rawmaterials/${rm.id}`} passHref>
                  <Button variant="link" colorScheme="blue">{rm.name}</Button>
                </Link>
              </Td>
              <Td>{rm.quantity}</Td>
              <Td>{rm.unitOfMeasure}</Td>
              <Td>
                <Link href={`/Inventory/rawmaterials/${rm.id}/edit`} passHref>
                  <Button colorScheme="yellow" size="sm" mr={2}>Edit</Button>
                </Link>
                <IconButton
                  aria-label="Delete raw material"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(rm.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RawMaterialList;
