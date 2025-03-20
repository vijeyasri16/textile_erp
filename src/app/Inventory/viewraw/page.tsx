'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Input, 
  Select, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Button, 
  VStack, 
  HStack 
} from '@chakra-ui/react';
import Link from 'next/link';

// Sample Raw Materials Data
const initialRawMaterials = [
  { id: 1, name: 'Cotton Fabric', quantity: 50, unit: 'kg' },
  { id: 2, name: 'Dye Powder', quantity: 20, unit: 'g' },
  { id: 3, name: 'Polyester Yarn', quantity: 100, unit: 'm' },
  { id: 4, name: 'Chemical Agent', quantity: 10, unit: 'pcs' }
];

const ViewRawMaterials: React.FC = () => {
  const [rawMaterials, setRawMaterials] = useState(initialRawMaterials);
  const [search, setSearch] = useState('');
  const [filterUnit, setFilterUnit] = useState('');

  // Filtered Materials based on Search & Unit
  const filteredMaterials = rawMaterials.filter(material => 
    material.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterUnit === '' || material.unit === filterUnit)
  );

  // Handle Delete
  const handleDelete = (id: number) => {
    setRawMaterials(rawMaterials.filter(material => material.id !== id));
  };

  return (
    <Box maxW="800px" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading size="lg" textAlign="center" mb={6}>View Raw Materials</Heading>

      {/* Search & Filter Options */}
      <HStack spacing={4} mb={4}>
        <Input 
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select placeholder="Filter by Unit" value={filterUnit} onChange={(e) => setFilterUnit(e.target.value)}>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="m">m</option>
          <option value="pcs">pcs</option>
        </Select>
      </HStack>

      {/* Raw Materials Table */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Available Quantity</Th>
            <Th>Unit</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredMaterials.map((material) => (
            <Tr key={material.id}>
              <Td>{material.name}</Td>
              <Td>{material.quantity}</Td>
              <Td>{material.unit}</Td>
              <Td>
                <Button colorScheme="red" size="sm" onClick={() => handleDelete(material.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Exit Button */}
      <Box mt={6} textAlign="center">
        <Link href="/Inventory" passHref>
          <Button colorScheme="teal">Exit</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ViewRawMaterials;
