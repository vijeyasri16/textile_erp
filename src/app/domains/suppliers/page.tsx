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

interface Supplier {
  id: number;
  name: string;
  phone: string;
  supplierAddress: string;
}

const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://localhost:6660/suppliers');
        if (!response.ok) throw new Error('Failed to fetch suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this supplier?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:6660/suppliers/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
        }
      } catch (error) {
        console.error('Error deleting supplier:', error);
      }
    }
  };

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Supplier List</Heading>

      <Button colorScheme="blue" mb={4}>
        <Link href="/domains/suppliers/new">Add New Supplier</Link>
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Supplier Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {suppliers.map((supplier) => (
            <Tr key={supplier.id}>
              <Td>
                <Link href={`/domains/suppliers/${supplier.id}`} passHref>
                  <Button variant="link" colorScheme="blue">{supplier.name}</Button>
                </Link>
              </Td>
              <Td>{supplier.phone}</Td>
              <Td>{supplier.supplierAddress}</Td>
              <Td>
                <Link href={`/domains/suppliers/${supplier.id}/edit`} passHref>
                  <Button colorScheme="yellow" size="sm" mr={2}>Edit</Button>
                </Link>
                <IconButton
                  aria-label="Delete supplier"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(supplier.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SupplierList;
