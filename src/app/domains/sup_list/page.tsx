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
  Flex,
  IconButton
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface Supplier {
  id: number;
  name: string;
  phone: string;
  address: string;
}

const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: 'ABC Textiles', phone: '123-456-7890', address: '123 Main St, City' },
    { id: 2, name: 'XYZ Fabrics', phone: '987-654-3210', address: '456 Market St, Town' },
  ]);

  // Function to delete a supplier
  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this supplier?');
    if (confirmed) {
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    }
  };

  return (
    <Box maxW="700px" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading size="lg" textAlign="center" mb={6}>Supplier List</Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Phone No</Th>
            <Th>Address</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {suppliers.map((supplier) => (
            <Tr key={supplier.id}>
              <Td>{supplier.name}</Td>
              <Td>{supplier.phone}</Td>
              <Td>{supplier.address}</Td>
              <Td>
                <IconButton
                  aria-label="Delete supplier"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(supplier.id)}
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

export default SupplierList;
