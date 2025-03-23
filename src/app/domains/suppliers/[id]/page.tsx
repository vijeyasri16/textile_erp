'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  Button
} from '@chakra-ui/react';
import Link from 'next/link';

const SupplierDetail: React.FC = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<{ name: string; phone: string; supplierAddress: string } | null>(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch(`http://localhost:6660/suppliers/${id}`);
        if (!response.ok) throw new Error('Supplier not found');
        const data = await response.json();
        setSupplier(data);
      } catch (error) {
        console.error('Error fetching supplier:', error);
      }
    };

    if (id) {
      fetchSupplier();
    }
  }, [id]);

  if (!supplier) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>{supplier.name}</Heading>
      <Text><strong>Phone:</strong> {supplier.phone}</Text>
      <Text><strong>Address:</strong> {supplier.supplierAddress}</Text>

      <Box mt={6}>
        <Link href={`/suppliers/${id}/edit`} passHref>
          <Button colorScheme="blue" mr={2}>Edit</Button>
        </Link>
        <Link href="/suppliers" passHref>
          <Button colorScheme="teal">Back</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default SupplierDetail;
